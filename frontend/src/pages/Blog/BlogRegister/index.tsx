import React from "react";
import { Content } from "components/Content";
import { Footer } from "components/Footer";
import { MainVisual } from "components/MainVisual";
import { Sidebar } from "components/Sidebar/Admin";
import { SubContent } from "components/SubContent";
import { SubPageTitle } from "components/SubPageTitle";
import { Button } from "components/Button";
import { FormContainer } from "components/Form/FormContainer";
import { Alert } from "components/Alert";
import { useCallback, useRef, useState } from "react";
import { TextEditor } from "components/TextEditor/TextEditor";
import { BlogType } from "Type";
import { useAppSelector } from "stores/hooks";
import { EditorState, convertToRaw } from "draft-js";
import { linkDecorator } from "components/TextEditor/Link";
import { useUploadImage } from "hooks/useUploadImage";
import { useBlog } from "hooks/useBlog";
import "./BlogRegister.css";
import { Head } from "components/Head";

export const BlogRegister = () => {
  const { admin } = useAppSelector((state) => state);
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [titleCheck, setTitleCheck] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [descriptionImage, setDescriptionImage] = useState<File | null>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const descriptionImageInputRef = useRef<HTMLInputElement>(null);
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty(linkDecorator),
  );
  const { prepareAndUploadImages } = useUploadImage();
  const { registerBlog } = useBlog();
  const [thumbnailURL, setThumbnailURL] = useState<string | null>(null);
  const [descriptionImageURL, setDescriptionImageURL] = useState<string | null>(
    null,
  );
  // const [ file ]

  const checkTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTitleCheck("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title === "") {
      setTitleCheck("タイトルは必須です。");
      return false;
    }

    try {
      const newBlog: BlogType = {
        adminId: admin.id!,
        title: title,
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        thumbnail: "",
        descriptionImage: "",
      };

      let blogData: BlogType = newBlog;

      if (thumbnail || descriptionImage) {
        blogData = prepareAndUploadImages(
          "blog/",
          thumbnail,
          descriptionImage,
          blogData,
          newBlog,
        ) as BlogType;
      }

      await registerBlog(blogData);

      if (thumbnailInputRef.current) {
        thumbnailInputRef.current.value = "";
      }

      if (descriptionImageInputRef.current) {
        descriptionImageInputRef.current.value = "";
      }

      setIsAlertVisible(true);
      setTitle("");
      setTitleCheck("");
    } catch (error) {
      alert(`エラーが発生しました。${error}`);
    }
  };

  const operationFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: "Thumbnail" | "DescriptionImage",
  ) => {
    if (e.target.files) {
      switch (target) {
        case "Thumbnail":
          setThumbnail(e.target.files[0]);
          setThumbnailURL(URL.createObjectURL(e.target.files[0]));
          break;
        case "DescriptionImage":
          setDescriptionImage(e.target.files[0]);
          setDescriptionImageURL(URL.createObjectURL(e.target.files[0]));
          break;
        default:
          break;
      }
    }
  };

  const changeAlertVisible = useCallback(() => {
    setIsAlertVisible((prevState) => !prevState);
  }, []);

  return (
    <>
      <Head title={"BLOG作成"} description={"BLOG作成"} />
      <Sidebar />
      <main>
        <MainVisual image={"contact/mv.jpg"} />
        <Content>
          <div className="c-blog-register">
            <SubPageTitle title={"BLOG登録"} sub={""} />
          </div>
          <SubContent>
            {isAlertVisible && (
              <Alert
                changeAlertVisible={changeAlertVisible}
                text={"BLOGを更新しました。"}
              />
            )}
            <FormContainer>
              <form onSubmit={(e) => handleSubmit(e)}>
                <dl className="form-def">
                  <dt>タイトル</dt>
                  <dd>
                    <input
                      type="text"
                      onChange={(e) => checkTitleInput(e)}
                      value={title}
                    />
                    {titleCheck && (
                      <p className="form-attention">{titleCheck}</p>
                    )}
                  </dd>
                </dl>
                <dl className="form-def">
                  <dt>サムネイル</dt>
                  <dd>
                    <p className="form-image-show">
                      {thumbnailURL && <img src={thumbnailURL} alt="" />}
                    </p>
                    <input
                      type="file"
                      accept=".png, .jpeg, .jpg"
                      onChange={(e) => operationFile(e, "Thumbnail")}
                      ref={thumbnailInputRef}
                    />
                  </dd>
                </dl>
                <dl className="form-def">
                  <dt>詳細画像</dt>
                  <dd>
                    <p className="form-image-show">
                      {descriptionImageURL && (
                        <img src={descriptionImageURL} alt="" />
                      )}
                    </p>
                    <input
                      type="file"
                      accept=".png, .jpeg, .jpg"
                      onChange={(e) => operationFile(e, "DescriptionImage")}
                      ref={descriptionImageInputRef}
                    />
                  </dd>
                </dl>
                <dl className="form-def">
                  <dt>内容</dt>
                  <dd>
                    <TextEditor
                      editorState={editorState}
                      setEditorState={setEditorState}
                    />
                  </dd>
                </dl>
                <div className="contact-button">
                  <Button
                    buttonType={"button"}
                    text={"登録する"}
                    link={null}
                    handleClick={null}
                  />
                </div>
              </form>
            </FormContainer>
          </SubContent>
        </Content>
      </main>
      <Footer />
    </>
  );
};
