import api from '../config/api'

export const getAllMembers = () => api.get('/manager/users'); //전체 조회
export const getMemberById = (id:string) => api.get(`/manager/users/${id}`);    //아이디로 조회

//더미
export const createMember = (memberData: any) => api.post('/join', memberData);