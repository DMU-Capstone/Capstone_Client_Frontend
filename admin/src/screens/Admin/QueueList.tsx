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
    const [filteredQueue, setFilteredQueue] = useState<any[]>([]);

    const fetchQueue = async() => {
        const res = await getAllQueue();
        setQueue(res.data);
        setFilteredQueue(res.data);
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
    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            setFilteredQueue(queue);
        } else {
            const filtered = queue.filter((item) => 
                item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.code?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredQueue(filtered);
        }
    };

    useEffect(() => {
        fetchQueue();
    }, []);

    return (
    <div>

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
                onClick={handleSearch}>검색
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
                    {queue.map((item) => (
                        <TableRow key={item.id} selected={selectedIds.includes(item.id)}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedIds.includes(item.id)}
                                    onChange={()=>handleToggleOne(item.id)}
                                />
                            </TableCell>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.waitingCount} 명</TableCell>
                            <TableCell>{item.queueCode}</TableCell>
                            <TableCell>{item.createDate || "-"}</TableCell>
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