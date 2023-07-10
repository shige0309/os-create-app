import "./Blog.css";

import { AxiosResponse } from "axios";
import { Contact } from "components/Contact";
import { Content } from "components/Content";
import { Footer } from "components/Footer";
import { Head } from "components/Head";
import { MainVisual } from "components/MainVisual";
import { Sidebar } from "components/Sidebar/Front";
import { SubContent } from "components/SubContent";
import { SubPageTitle } from "components/SubPageTitle";
import { convertFromRaw, EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { useBlog } from "hooks/useBlog";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "stores/hooks";
import { GetBlogType } from "Type";

export const BlogPage = () => {
  const { admin } = useAppSelector((state) => state);
  const { getDetailBlog } = useBlog();
  const [blog, setBlog] = useState<GetBlogType>();
  const id = useParams().id;
  const PUBLIC_FOLDER = process.env.REACT_APP_S3_OBJ_URL;

  useEffect(() => {
    window.scrollTo(0, 0);

    const getBlog = async () => {
      if (id) {
        const blog: AxiosResponse<GetBlogType> = await getDetailBlog(id);

        const date = new Date(blog.data.updatedAt);
        const formatDate = `${date.getFullYear()}.${
          date.getMonth() + 1
        }.${date.getDate()}`;

        const rawContent = JSON.parse(blog.data.content as string);
        const contentState = convertFromRaw(rawContent);
        const editorState = EditorState.createWithContent(contentState);

        setBlog({
          ...blog.data,
          content: stateToHTML(editorState.getCurrentContent()),
          updatedAt: formatDate,
        });
      }
    };

    getBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Head
        title={blog ? blog.title : null}
        description={blog ? blog.title : null}
      />
      <Sidebar />
      <main>
        <MainVisual image={"blog/mv.jpg"} />
        <Content>
          <div className="blog">
            <SubPageTitle title={"BLOG"} sub={"ブログ"} />
            <div className="blog-title-date">
              <time dateTime={blog?.updatedAt} className="blog-date">
                {blog?.updatedAt}
              </time>
              <h1 className="blog-title">{blog?.title}</h1>
            </div>
          </div>
          <SubContent>
            <div className="blog-content">
              {blog ? (
                <p className="blog-thumbnail">
                  <img
                    src={PUBLIC_FOLDER + "blog/" + blog.descriptionImage}
                    alt={blog?.title}
                  />
                </p>
              ) : (
                <p className="blog-thumbnail">
                  <img src="/blog/content-mv.jpg" alt="ブログノーイメージ" />
                </p>
              )}
              {blog ? parse(blog?.content) : ""}
              {admin.id ? (
                <p className="blog-edit">
                  <Link to={`/blog/update/${blog?._id}`}>編集する</Link>
                </p>
              ) : null}
            </div>
          </SubContent>
          <Contact />
        </Content>
      </main>
      <Footer />
    </>
  );
};
