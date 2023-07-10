import axios, { AxiosResponse } from "axios";
import { BlogType, GetBlogType } from "Type";

export const useBlog = () => {
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const registerBlog = async (blog: BlogType) => {
    try {
      await axios.post("/blog/register", blog);
    } catch (error) {
      alert(`登録に失敗しました。${error}`);
    }
  };

  const getBlogs = async (): Promise<AxiosResponse<GetBlogType[]>> => {
    try {
      const response: AxiosResponse<GetBlogType[]> = await axios.get(
        REACT_APP_BACKEND_URL + "/blog/get",
      );
      return response;
    } catch (error) {
      alert(`取得に失敗しました。${error}`);
      throw error;
    }
  };

  const getDetailBlog = async (
    id: string,
  ): Promise<AxiosResponse<GetBlogType>> => {
    try {
      const response: AxiosResponse<GetBlogType> = await axios.get(
        REACT_APP_BACKEND_URL + `/blog/${id}`,
      );
      return response;
    } catch (error) {
      alert(`取得に失敗しました。${error}`);
      throw error;
    }
  };

  const updateBlog = async (
    id: string,
    updateData: BlogType,
  ): Promise<void> => {
    try {
      await axios.put(REACT_APP_BACKEND_URL + `/blog/update/${id}`, updateData);
    } catch (error) {
      alert(`更新に失敗しました。${error}`);
      throw error;
    }
  };

  return { registerBlog, getBlogs, getDetailBlog, updateBlog };
};
