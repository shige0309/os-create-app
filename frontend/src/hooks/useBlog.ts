import { BlogType, GetBlogType } from "Type"
import axios, { AxiosResponse } from "axios"

export const useBlog = () => {

    const registerBlog = async (blog: BlogType) => {
        try {
            await axios.post("/blog/register", blog);
        } catch (error) {
            alert(`登録に失敗しました。${error}`);
        }
    }

    const getBlogs = async (): Promise<AxiosResponse<GetBlogType[]>> => {
        try {
            const response: AxiosResponse<GetBlogType[]> = await axios.get("/blog/get");
            return response;
        } catch (error) {
            alert(`取得に失敗しました。${error}`);
            throw error;
        }
    }

    const getDetailBlog = async (id: string): Promise<AxiosResponse<GetBlogType>> => {
        try {
            const response: AxiosResponse<GetBlogType> = await axios.get(`/blog/${id}`);
            return response;
        } catch (error) {
            alert(`取得に失敗しました。${error}`);
            throw error;
        }
    }

    const updateBlog = async (id: string, updateData: BlogType): Promise<void> => {
        try {
            await axios.put(`/blog/update/${id}`, updateData);
        } catch (error) {
            alert(`更新に失敗しました。${error}`);
            throw error;
        }
    }

    return {registerBlog, getBlogs, getDetailBlog, updateBlog};
}
