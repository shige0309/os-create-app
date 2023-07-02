
import { SectionTitle } from "components/SectionTitle";
import { BlogCard } from "components/Card/BlogCard";
import { useEffect, useState } from "react";
import { GetBlogType } from "Type";
import {useBlog} from "hooks/useBlog";
import { EditorState, convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import "./HomeBlog.css";

export const HomeBlog = () => {
  const [ blogs, setBlogs ] = useState<GetBlogType[]>();
  const { getBlogs } = useBlog();

  useEffect(() => {

    const getBlog = async () => {
      const result = await getBlogs();

      let blogData: GetBlogType[];

      blogData = result.data.map((blog) => {
      const rawContent = JSON.parse(blog.content as string);
      const contentState = convertFromRaw(rawContent);
      const editorState = EditorState.createWithContent(contentState);

      return {
        _id: blog._id,
        adminId: blog.adminId,
        title: blog.title,
        // content: stateToHTML(editorState.getCurrentContent()),
        content: editorState.getCurrentContent().getPlainText(),
        thumbnail: blog.thumbnail,
        descriptionImage: blog.descriptionImage,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
      }
    });

      setBlogs(blogData);
    }

    getBlog();
    
  }, [])

  return (
    <section>
      <SectionTitle en="BLOG" title=""/>
      <div className="c-home-blog">
      {blogs ? blogs.map((blog) => {
        return <BlogCard props={blog} key={blog._id}/>
      }) : <p>ブログはありません。</p>}
      </div>
    </section>
  )
}
