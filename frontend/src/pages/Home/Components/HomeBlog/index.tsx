import "./HomeBlog.css";

import CircularProgress from "@mui/joy/CircularProgress";
import { BlogCard } from "components/Card/BlogCard";
import { SectionTitle } from "components/SectionTitle";
import { convertFromRaw, EditorState } from "draft-js";
import { useBlog } from "hooks/useBlog";
import { useEffect, useState } from "react";
import { GetBlogType } from "Type";

export const HomeBlog = () => {
  const [blogs, setBlogs] = useState<GetBlogType[]>();
  const { getBlogs } = useBlog();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBlog = async () => {
      setLoading(true);
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
        };
      });

      setBlogs(blogData);
      setLoading(false);
    };

    getBlog();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <SectionTitle en="BLOG" title="" />
      {loading && (
        <div className="c-homeWork-progress">
          <CircularProgress size="lg" />
          <p>ローディング中</p>
        </div>
      )}
      <div className="c-home-blog">
        {blogs ? (
          blogs.map((blog) => {
            return <BlogCard props={blog} key={blog._id} />;
          })
        ) : (
          <p>ブログはありません。</p>
        )}
      </div>
    </section>
  );
};
