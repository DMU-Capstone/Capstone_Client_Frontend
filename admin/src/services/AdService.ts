import api from "../config/api"

export const getAllAds = () => {
    return api.get("/admin/event")
};

export const uploadAdImage = (image: File) => {
    const formData = new FormData();
    formData.append("images", image);
    return api.post("/admin/event/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const setMainBanner = (imgId: number, number: number) => {
    return api.post(`/admin/event/select?imgId=${imgId}&number=${number}`);
};

export const getMainBanner = () => {
    return api.get("/admin/event/select");
};