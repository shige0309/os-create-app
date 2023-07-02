import { AdminType } from 'Type'
import axios, { AxiosResponse } from 'axios';
import { useAppDispatch } from 'stores/hooks';
import { deleteAdmin, setAdmin } from 'stores/slice/adminSlice';



export const useAdmin = () => {
    const dispatch = useAppDispatch();

    const login = async (admin: AdminType) => {

        const response:AxiosResponse = await axios.post("/admin/login", admin);
        const adminId: string = response.data.admin._id;
        dispatch(setAdmin(adminId));

        const token = response.data.token;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem('token', token);
    }

    const getAdmin = async () => {
        try {
            const response: AxiosResponse = await axios.get("/admin");
            const id = response.data._id;
            dispatch(setAdmin(id));
        } catch (error) {
            alert(`エラーが発生しました${error}`);
        }
    }

    const getRegisterAdmin = async (): Promise<AxiosResponse<string, string>> => {
        try {
            const response: AxiosResponse<string, string> = await axios.get("/admin");
            return response;
        } catch (error) {
            alert(`エラーが発生しました${error}`);
            throw error;
        }
    }

    const updateAdmin = async (updateData: AdminType): Promise<AxiosResponse<string, string>> => {
        try {
            const response: AxiosResponse<string, string> = await axios.put("/admin/update", updateData);
            return response;
        } catch (error) {
            alert(`エラーが発生しました${error}`);
            throw error;
        }
    }

    const logout = () => {
        const token = null;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        dispatch(deleteAdmin(null));
        localStorage.removeItem("token");
    }

    return {login, getAdmin, logout, updateAdmin, getRegisterAdmin};
 }
