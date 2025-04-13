import React, { Children, useEffect, useState } from "react";
import { getAllMembers} from "../../services/memberService";
import '../../styles/Admin.css';
import { useNavigate } from "react-router-dom";
import { dummyMembers } from './dummy'; //더미데이터
import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow, TextField, Paper, TableContainer, Button, Box} from "@mui/material";

const MemberListScreen = () => {

    //체크박스
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const isAllSelected = selectedIds.length === dummyMembers.length;

    //검색창 및 날짜
    const [searchTerm, setSearchTerm] = useState('');
    const [searchDate, setSearchDate] = useState('');

    //members 배열
    const [members, setMembers] = useState([]);  

    //체크박스
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

    //fetch
    const fetchMembers = async() => {
        const res = await getAllMembers();
        setMembers(res.data);
    }

    /*  추가 예정
    const handleDelete = async (id: string) => {
        await deleteMember(id);
        fetchMembers();
    }
    */

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getAllMembers();
                setMembers(data.content);
            } catch (e) {
                alert("회원 목록을 불러오지 못했습니다.");
            }
        };
        fetch();
    }, []);

    return (
    <div>

        <div className="contentArea"
            style={{
                transition: "margin 0.4s ease",
                justifyContent: "flex-start",
                alignItems: "flex-start"
            }}
        >

        <Box display="flex" justifyContent="flex-start" alignItems="flex-start" gap={2} mb={3} mt={2}>
            <TextField
                label="회원번호 혹은 이름으로 검색"
                variant="outlined"
                size="small"
                sx={{ width: 300 }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <TextField
                type="date"
                size="small"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                //InputLabelProps={{ shrink: true }}
            />
            <Button
                variant="contained"
                size="medium"
                onClick={() => {
                    // 검색 실행
                }}>검색
            </Button>
            <Button
                variant="contained"
                size="medium"
                onClick={() => {
                    // 검색 실행
                }}>삭제
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
                        <TableCell>이름</TableCell>
                        <TableCell>닉네임</TableCell>
                        <TableCell>이메일</TableCell>
                        <TableCell>회원유형</TableCell>
                        <TableCell>생성일</TableCell>
                        <TableCell>관리</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {members.map((member: any) => (
                        <TableRow key={member.id} selected={selectedIds.includes(member.id)}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedIds.includes(member.id)}
                                    onChange={()=>handleToggleOne(member.id)}
                                />
                            </TableCell>
                            <TableCell>{member.name}</TableCell>
                            <TableCell>{member.nickname}</TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>{member.id}</TableCell>
                            <TableCell>{member.create_date}</TableCell>
                            <TableCell>
                                <Button variant="contained" size="small" color="primary">수정</Button>
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

export default MemberListScreen;