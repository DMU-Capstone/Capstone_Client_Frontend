import api from '../config/api';


export const getAllMembers = async (page = 1, size = 10) => {
    try {
        const res = await api.get("/admin/users", {
            params: { page, size },
        });
        return res.data;
    } catch (err) {
        console.error("회원 조회 실패", err);
        throw err;
    }
};
export const getMemberById = async (id: string) => {
    try {
        const res = await api.get(`/admin/users/${id}`);
        return res.data;
    } catch (err) {
        throw err;
    }
}

export const updateMember = (id: number, data: any) =>
    api.patch(`/admin/users`, data);

export const deleteMember = (id: number, data: any) =>
    api.delete(`/admin/users/${id}`, { data })