import api from "../config/api";

interface JoinQueueRequest {
  phoneNumber: string;
  name: string;
  count: number;
}

interface JoinQueueResponse {
  status: string;
  index: string;
}

const GuestService = {
  /**
   * 대기열에 게스트 등록 (호스트 ID 기반)
   * @param id 호스트 ID 또는 Queue ID
   * @param data 전화번호, 이름, 인원수
   * @returns 등록 결과 객체
   */
  joinQueue: async (id: string, data: JoinQueueRequest): Promise<JoinQueueResponse> => {
    const response = await api.post<JoinQueueResponse>(`/queue/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },
};

export default GuestService;
