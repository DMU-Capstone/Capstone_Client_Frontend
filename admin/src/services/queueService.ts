import api from '../config/api'

//모든 대기열 조회
export const getAllQueues = async (page = 1, size = 10) => {
    return api.get('/admin/hosts', {
        params: { page, size },
        headers: { "Content-Type": "application/json" },
    });
};