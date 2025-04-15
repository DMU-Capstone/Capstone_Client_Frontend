import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Box, Typography } from "@mui/material"
import "../../styles/modalStyle.css"

const dummyAds = [
    { id: 1, title: "광고 A", image: "/images/ad1.png", createdAt: "2024-05-01" },
    { id: 2, title: "광고 B", image: "/imgaes/ad2.png", createdAt: "2024-06-15" }
];

const AdManager = () => {
    const [ads, setAds] = useState(dummyAds);
    const [selectedAd, setSelectedAd] = useState<any>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpen = (ad: any) => {
        setSelectedAd(ad);
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
        setSelectedAd(null);
    };

    return (
        <>
            <Typography variant="h5" gutterBottom>광고 목록</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>번호</TableCell>
                            <TableCell>제목</TableCell>
                            <TableCell>이미지</TableCell>
                            <TableCell>등록일</TableCell>
                            <TableCell>관리</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ads.map((ad) => (
                        <TableRow key={ad.id}>
                            <TableCell>{ad.id}</TableCell>
                            <TableCell>{ad.title}</TableCell>
                            <TableCell>
                                <img src={ad.image} alt="ad" style={{ width: "100px" }} />
                            </TableCell>
                            <TableCell>{ad.createdAt}</TableCell>
                            <TableCell>
                                <Button variant="contained" onClick={() => handleOpen(ad)}>
                                    수정
                                </Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={modalOpen} onClose={handleClose}>
                <Box className="modalBox">
                    <Typography variant="h6" gutterBottom>광고 수정</Typography>
                    <Typography>{selectedAd?.title}</Typography>

                    <input type="file" accept="image/*" onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            const imageUrl = URL.createObjectURL(file);
                            setAds((prev) => prev.map((ad) => 
                                ad.id === selectedAd.id ? { ...ad, image: imageUrl} : ad
                            ));
                        }
                    }}
                    />
                    <Button sx={{mt:2}} onClick={handleClose} variant="contained" color="primary">
                        닫기
                    </Button>
                </Box>
            </Modal>
        </>
    )
}

export default AdManager;