import api from '../config/api'

export const getAllQueues = async (page = 1, size = 10) => {
    return api.get('/admin/hosts', {
        params: { page, size },
    });
};

export const updateQueue = (id: number, data: any) => 
    api.patch(`/admin/hosts`, data);

export const deleteQueue = (id: number) =>
    api.delete(`/admin/hosts/${id}`);

