import axios, { AxiosResponse } from "axios";
import { GetWorkType, WorkType } from "Type";

export const useWork = () => {
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const registerWork = async (work: WorkType) => {
    try {
      await axios.post(REACT_APP_BACKEND_URL + "/work/register", work);
    } catch (error) {
      alert(`登録に失敗しました。${error}`);
    }
  };

  const getWorks = async (): Promise<AxiosResponse<GetWorkType[]>> => {
    try {
      const response: AxiosResponse<GetWorkType[]> = await axios.get(
        REACT_APP_BACKEND_URL + "/work/get",
      );
      return response;
    } catch (error) {
      alert(`取得に失敗しました。${error}`);
      throw error;
    }
  };

  const getDetailWork = async (
    id: string,
  ): Promise<AxiosResponse<GetWorkType>> => {
    try {
      const response: AxiosResponse<GetWorkType> = await axios.get(
        REACT_APP_BACKEND_URL + `/work/${id}`,
      );
      return response;
    } catch (error) {
      alert(`取得に失敗しました。${error}`);
      throw error;
    }
  };

  return { registerWork, getWorks, getDetailWork };
};
