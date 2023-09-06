import axios, { AxiosResponse } from "axios";
import { useAppDispatch } from "stores/hooks";
import { deleteAdmin, setAdmin } from "stores/slice/adminSlice";
import { AdminType } from "Type";

export const useAdmin = () => {
  const dispatch = useAppDispatch();
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const login = async (admin: AdminType) => {
    const response: AxiosResponse = await axios.post(
      REACT_APP_BACKEND_URL + "/admin/login",
      admin
    );
    const adminId: string = response.data.admin._id;
    dispatch(setAdmin(adminId));

    const token = response.data.token;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  };

  const getAdmin = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        REACT_APP_BACKEND_URL + "/admin"
      );
      const id = response.data._id;
      dispatch(setAdmin(id));
    } catch (error) {
      alert(`getAdminでエラーが発生しました${error}`);
    }
  };

  const getRegisterAdmin = async (): Promise<AxiosResponse<string, string>> => {
    try {
      const response: AxiosResponse<string, string> = await axios.get(
        REACT_APP_BACKEND_URL + "/admin"
      );
      return response;
    } catch (error) {
      alert(`getRegisterAdminでエラーが発生しました${error}`);
      throw error;
    }
  };

  const updateAdmin = async (
    updateData: AdminType
  ): Promise<AxiosResponse<string, string>> => {
    try {
      const response: AxiosResponse<string, string> = await axios.put(
        REACT_APP_BACKEND_URL + "/admin/update",
        updateData
      );
      return response;
    } catch (error) {
      alert(`updateAdminでエラーが発生しました${error}`);
      throw error;
    }
  };

  const logout = () => {
    const token = null;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch(deleteAdmin(null));
    localStorage.removeItem("token");
  };

  return { login, getAdmin, logout, updateAdmin, getRegisterAdmin };
};
