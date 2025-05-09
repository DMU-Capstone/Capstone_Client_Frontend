import api from '../config/api'

export const getAllQueue = () => api.get('/manager/queue'); //전체 조회
export const getQueueById = (id:string) => api.get(`/manager/queue/${id}`);    //대기열 생성 시 발급되는 코드로 조회


//더미
