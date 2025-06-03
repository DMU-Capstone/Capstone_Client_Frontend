import React, { useState } from "react";
import { Box, Modal, Typography, IconButton } from "@mui/material";
import { Add, ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import api, { BASE_URL } from "../config/api";

interface Props {
    open: boolean;
    onClose: () => void;
}

const BannerModal: React.FC<Props> = ({ open, onClose }) => {
    const [banners, setBanners] = useState<string[]>([]); // imgPath 배열
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleAddClick = () => {
        // 광고 목록 선택용 모달 띄우거나 API 요청 후 추가 (구현 예정)
        alert("DB에서 광고 이미지 선택");
    };

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    const handleNext = () => {
        if (currentIndex < banners.length) setCurrentIndex(currentIndex + 1);
    };

    const renderContent = () => {
        if (currentIndex === banners.length) {
        return (
            <IconButton onClick={handleAddClick} sx={{ fontSize: 80 }}>
            <Add fontSize="inherit" />
            </IconButton>
        );
        }

        return (
        <img
            src={`${BASE_URL}${banners[currentIndex]}`}
            alt="배너"
            style={{ width: "100%", maxHeight: 300, objectFit: "contain" }}
        />
        );
    };

    return (
        <Modal open={open} onClose={onClose}>
        <Box className="modalBox" sx={{ width: 600 }}>
            <Typography variant="h6" mb={2}>미리보기</Typography>
            <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
            <IconButton onClick={handlePrev}><ArrowBackIos /></IconButton>
            <Box>{renderContent()}</Box>
            <IconButton onClick={handleNext}><ArrowForwardIos /></IconButton>
            </Box>
        </Box>
        </Modal>
    );
};

export default BannerModal;