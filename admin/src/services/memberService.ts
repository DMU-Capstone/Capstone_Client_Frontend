import api from '../config/api'
import axios from 'axios';

const BASE_URL = "http://134.185.99.89:8080";
const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJuYW1lIjoiMDEwLTEyMzQtMTIzNCIsInJvbGUiOiJST0xFX0FETUlOIiwiaWF0IjoxNzQ0NDg3NjI3LCJleHAiOjE3NDQ0ODgyMjd9.Nnn4U56-xLtvfvwBM4gmhNulnk73LppeKk8VI55oSIw";


export const getAllMembers = async (page = 1, size = 10) => {
    try {
        const res = await axios.get(`${BASE_URL}/admin/users`, {
            params: { page, size },
            headers: {
                "Content-Type": "application/json",
                Authorization: `access: ${accessToken}`,
            },
        });
        return res.data;
    } catch (err) {
        console.error("회원 조회 실패", err);
        throw err;
    }
};
export const getMemberById = (id:string) => api.get(`/manager/users/${id}`);    //아이디로 조회

