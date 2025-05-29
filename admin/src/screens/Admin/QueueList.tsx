import React, { Children, useEffect, useState } from "react";
import { getAllQueues, getActiveQueues, getQueueDetail } from "../../services/queueService";
import '../../styles/Admin.css';
import { useNavigate } from "react-router-dom";
import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow, TextField, Paper, TableContainer, Button, Box} from "@mui/material";
import EndQueueModal from "../../components/QueueModal";

interface Queue {
    id: number;
    hostName: string;
    maxPeople: number;
    hostManagerName: string;
    hostPhoneNumber: string;
    latitude: number;
    longitude: number;
    keyword: string;
    description: string;
    startTime: string;
    endTime: string;
}

//실시간 큐 조회 추가
interface ActiveQueue {
  id: number;
  name: string;
  hostImage: {
    imgPath: string;
    createdAt: string;
  };
}
interface QueueDetail {
  phoneNumber: string;
  name: string;
  count: number;
}

const QueueList = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [activeQueues, setActiveQueues] = useState<Queue[]>([]);
    const [endedQueues, setEndedQueues] = useState<Queue[]>([]);
    const [queueModalOpen, setQueueModalOpen] = useState(false);
    const [queue, setQueue] = useState<Queue[]>([]);  //queue 배열
    const [filteredQueue, setFilteredQueue] = useState<any[]>([]);
    //실시간 큐 조회 추가
    const [activeCounts, setActiveCounts] = useState<Record<number, number>>({});

    const fetchQueue = async() => {
        try {
            const { data } = await getAllQueues();
            const allQueues: Queue[] = data.content;

            //date 변환 및 종료시간 비교
            const now = new Date().getTime();
            
            const active = allQueues.filter(q => new Date(q.endTime).getTime() > now);

            setActiveQueues(active);
            setQueue(allQueues);
            setFilteredQueue(active);
        } catch {
            alert("대기열 불러오기 실패");
        }
    };

    //검색
    const handleSearch = () => {
        if (searchTerm.trim() === "") {
            setFilteredQueue(queue);
        } else {
            const filtered = queue.filter(q => 
                q.hostName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredQueue(filtered);
        }
    };

    //체크박스
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const isAllSelected = selectedIds.length === queue.length;

    const handleToggleOne = (id: number) => {
        setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };
    const handleToggleAll = () => {
        if (isAllSelected) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredQueue.map((Queue) => Queue.id));
        }
    };

    //실시간 큐 조회 추가
    const fetchActiveCounts = async () => {
        try {
            const { data: activeList } = await getActiveQueues();

            const countsMap: Record<number, number> = {};

            await Promise.all(
            activeList.map(async (queue: ActiveQueue) => {
                const { data } = await getQueueDetail(queue.id);
                countsMap[queue.id] = data?.[0]?.count ?? 0;
            })
            );

            setActiveCounts(countsMap);
        } catch (error) {
            console.error("Redis 실시간 큐 조회 실패", error);
        }
    };

    useEffect(() => {
        fetchQueue();
        fetchActiveCounts();
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
                label="호스트 이름 검색"
                variant="outlined"
                size="small"
                sx={{ width: 300 }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Button
                variant="contained"
                size="medium"
                onClick={handleSearch}>검색
            </Button>
            <Button
                variant="outlined"
                sx={{ ml: 2 }}
                onClick={() => setQueueModalOpen(true)}
                >
                기록 확인하기
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
                        <TableCell>호스트명</TableCell>
                        <TableCell>대기인원</TableCell>
                        <TableCell>매니저</TableCell>
                        <TableCell>시작</TableCell>
                        <TableCell>상태</TableCell>
                        <TableCell>종료</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {filteredQueue.map(q => (
                        <TableRow key={q.id} selected={selectedIds.includes(q.id)}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedIds.includes(q.id)}
                                    onChange={()=>handleToggleOne(q.id)}
                                />
                            </TableCell>
                            <TableCell>{q.hostName}</TableCell>
                            <TableCell>{q.maxPeople} 명</TableCell>
                            <TableCell>{q.hostManagerName}</TableCell>
                            <TableCell>{q.startTime}</TableCell>
                            <TableCell>
                                {activeCounts[q.id] != null ? `활성화 / ${activeCounts[q.id]} 명` : "종료"}
                            </TableCell>
                            <TableCell>{q.endTime}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>
        <EndQueueModal 
            open={queueModalOpen}
            onClose={() => setQueueModalOpen(false)}
        />
        
        </div>
    </div>
    );
};

export default QueueList;