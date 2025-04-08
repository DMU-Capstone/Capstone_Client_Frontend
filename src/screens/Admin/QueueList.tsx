import React, { Children, useEffect, useState } from "react";
import { getAllQueue } from "../../services/queueService";
import '../../styles/Admin.css';
import { useNavigate } from "react-router-dom";
import { dummyMembers } from './dummy'; //더미데이터
import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow, TextField, Paper, TableContainer, Button, Box} from "@mui/material";
import Sidebar from "./Sidebar";


const QueueList = () => {
    const navigate = useNavigate();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const isAllSelected = selectedIds.length === dummyMembers.length;
    const [searchTerm, setSearchTerm] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [queue, setQueue] = useState<any[]>([]);  //queue 배열

    const fetchQueue = async() => {
        const res = await getAllQueue();
        setQueue(res.data);
    }

    //사이드바
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarWidth = 280;

    /*  추가 예정
    const handleDelete = async (id: string) => {
        await deleteMember(id);
        fetchMembers();
    }
    */
   const handleToggleAll = () => {
       if (isAllSelected) {
           setSelectedIds([]);
       } else {
           setSelectedIds(dummyMembers.map((member) => member.id));
       }
       };
    const handleToggleOne = (id: number) => {
        setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        fetchQueue();
    }, []);

    return (
    <div>
        <Sidebar width={sidebarWidth} onToggle={setSidebarOpen}><p></p></Sidebar>

        <div className="contentArea"
            style={{
                marginLeft: `${sidebarOpen ? sidebarWidth + 50 : 50}px`,
                transition: "margin 0.4s ease",
                justifyContent: "flex-start",
                alignItems: "flex-start"
            }}
        >

        <Box display="flex" justifyContent="flex-start" alignItems="flex-start" gap={2} mb={3} mt={2}>
            <TextField
                label="대기열 코드 혹은 제목으로 검색"
                variant="outlined"
                size="small"
                sx={{ width: 400 }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* 날짜 및 시간대로 검색 기능 고민중 */}
            {/*<TextField
                type="date"
                size="small"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                //InputLabelProps={{ shrink: true }}
            />*/}

            <Button
                variant="contained"
                size="medium"
                onClick={() => {
                    // 검색 실행
                }}>검색
            </Button>
        </Box>


        <TableContainer component={Paper} className="container">
            <Table className="table">

                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                checked={isAllSelected}
                                indeterminate={selectedIds.length > 0 && !isAllSelected}
                                onChange={handleToggleAll}
                            />
                        </TableCell>
                        <TableCell>제목</TableCell>
                        <TableCell>대기인원</TableCell>
                        <TableCell>대기열 코드</TableCell>
                        <TableCell>생성일</TableCell>
                        <TableCell>관리</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {dummyMembers.map((member) => (
                        <TableRow key={member.id} selected={selectedIds.includes(member.id)}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedIds.includes(member.id)}
                                    onChange={()=>handleToggleOne(member.id)}
                                />
                            </TableCell>
                            <TableCell>{member.name}</TableCell>
                            <TableCell>0 명</TableCell>
                            <TableCell>{member.id}</TableCell>
                            <TableCell>{member.create_date}</TableCell>
                            <TableCell>
                                <Button variant="contained" size="small" color="primary">삭제</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>
        </div>
    </div>
    );
};

export default QueueList;