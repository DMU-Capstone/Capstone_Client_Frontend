import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Box, Typography } from "@mui/material"
import "../../styles/modalStyle.css"
import { getAllAds, uploadAdImage, setMainBanner } from "../../services/AdService";
import RegisterAdModal from "../../components/AdModal";

interface Ad {
    id: number;
    dbFilePath: string;
    createdAt: string;
}

const AdManager = () => {
    const [ads, setAds] = useState<Ad[]>([]);
    const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [registerModalOpen, setRegisterModalOpen] = useState(false);

    const fetchAds = async() => {
        try {
            const res = await getAllAds();
            console.log(res.data);
            setAds(res.data.content);
        } catch {
            alert("광고 목록을 불러오지 못했습니다.")
        }
    };

    //이미지 업로드
    const handleImageChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || selectedAd) return;

        try {
            await uploadAdImage(file);
            alert("이미지 업로드 완료");
            setModalOpen(false);
            fetchAds();
        } catch {
            alert("이미지 업로드 실패");
        }
    };

    
    const handleSetBanner = async (imgId: number, number: number) => {
        try {
            await setMainBanner(imgId, number);
            alert(`메인 배너(${number})로 설정 완료`);
        } catch {
            alert("메인 배너 설정 실패");
        }
    };

    const handleOpen = (ad: any) => {
        setSelectedAd(ad);
        setModalOpen(true);
    };

    const handleClose = () => {
        setSelectedAd(null);
        setModalOpen(false);
    };

    useEffect(() => {
        fetchAds();
    }, []);

    return (
        <>
            <Typography variant="h5" gutterBottom>광고 목록</Typography>
                <Button variant="contained" color="primary" onClick={() => setRegisterModalOpen(true)}>
                    광고 등록
                </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>번호</TableCell>
                            <TableCell>이미지</TableCell>
                            <TableCell>등록일</TableCell>
                            <TableCell>관리</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ads.map((ad, index) => (
                        <TableRow key={ad.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                <img src = {ad.dbFilePath} alt = "ad" style = {{ width: "100px" }} />
                            </TableCell>
                            <TableCell>
                                {new Date(ad.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <Button variant="contained" onClick={() => handleOpen(ad)}>
                                    수정
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    sx={{ml:1}}
                                    onClick={() => handleSetBanner(ad.id, 0)}
                                >메인으로 설정</Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <RegisterAdModal
                open={registerModalOpen}
                onClose={() => setRegisterModalOpen(false)}
                onSuccess={() => {
                    setRegisterModalOpen(false);
                    fetchAds();
                }}
            />

            <Modal open={modalOpen} onClose={handleClose}>
                <Box className="modalBox">
                    <Typography variant="h6" gutterBottom>광고 수정</Typography>
                    <Typography>이미지를 업로드</Typography>

                    <input type="file" accept="image/*" onChange={handleImageChange}/>
                    <Button sx={{mt:2}} onClick={handleClose} variant="contained" color="primary">
                        닫기
                    </Button>
                </Box>
            </Modal>
        </>
    )
}

export default AdManager;