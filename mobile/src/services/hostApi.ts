import axios from 'axios';

export const API_BASE_URL = 'http://134.185.99.89:8080'; // 실제 API 서버 URL로 변경하세요.

export interface HostSession {
    hostId: number;
    hostName: string;
    imgUrl: string;
    estimatedTime: string;
    waitingCount: number;
}

export const getAllHostSessions = async (): Promise<HostSession[]> => {
    try {
        const response = await axios.get<HostSession[]>(`${API_BASE_URL}/host/sessions`);
        return response.data;
    } catch (error) {
        console.error('Error fetching host sessions:', error);
        throw error; 
    }
}; 