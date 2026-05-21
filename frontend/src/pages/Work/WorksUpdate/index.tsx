import "../WorksRegister/WorksRegister.css";

import { AxiosResponse } from "axios";
import { Alert } from "components/Alert";
import { Button } from "components/Button";
import { Content } from "components/Content";
import { Footer } from "components/Footer";
import { FormContainer } from "components/Form/FormContainer";
import { Head } from "components/Head";
import { MainVisual } from "components/MainVisual";
import { Sidebar } from "components/Sidebar/Admin";
import { SubContent } from "components/SubContent";
import { SubPageTitle } from "components/SubPageTitle";
import { useUploadImage } from "hooks/useUploadImage";
import { useWork } from "hooks/useWork";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "stores/hooks";
import { GetWorkType, WorkType } from "Type";

export const WorksUpdate = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_S3_OBJ_URL;
  const { admin } = useAppSelector((state) => state);
  const [tag, setTag] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [tagCheck, setTagCheck] = useState<string>("");
  const [titleCheck, setTitleCheck] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [descriptionImage, setDescriptionImage] = useState<File | null>(null);
  const [thumbnailURL, setThumbnailURL] = useState<string | null>(null);
  const [descriptionImageURL, setDescriptionImageURL] = useState<string | null>(
    null,
  );
  const [work, setWork] = useState<GetWorkType>();
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const descriptionImageInputRef = useRef<HTMLInputElement>(null);
  const { getDetailWork, updateWork } = useWork();
  const { prepareAndUploadImages } = useUploadImage();
  const id = useParams().id;

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchWork = async () => {
      if (id) {
        const work: AxiosResponse<GetWorkType> = await getDetailWork(id);
        if (!work.data) {
          alert("WORKは存在しません。");
          return;
        }
        setWork(work.data);
        setTag(work.data.tag);
        setTitle(work.data.title);
      }
    };

    fetchWork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    return () => {
      if (thumbnailURL) {
        URL.revokeObjectURL(thumbnailURL);
      }

      if (descriptionImageURL) {
        URL.revokeObjectURL(descriptionImageURL);
      }
    };
  }, [thumbnailURL, descriptionImageURL]);

  const checkTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
    setTagCheck("");
  };

  const checkTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTitleCheck("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isTagEmpty = false;
    let isTitleEmpty = false;

    if (tag === "") {
      setTagCheck("タグは必須です。");
      isTagEmpty = true;
    }

    if (title === "") {
      setTitleCheck("タイトルは必須です。");
      isTitleEmpty = true;
    }

    if (isTagEmpty || isTitleEmpty || !id) {
      return false;
    }

    const newWork: WorkType = {
      adminId: admin.id!,
      tag: tag,
      title: title,
      thumbnail: work?.thumbnail ? work.thumbnail : "",
      descriptionImage: work?.descriptionImage ? work.descriptionImage : "",
    };

    let workData: WorkType = newWork;

    try {
      if (thumbnail || descriptionImage) {
        workData = (await prepareAndUploadImages(
          "work/",
          thumbnail,
          descriptionImage,
          workData,
          newWork,
        )) as WorkType;
      }

      await updateWork(id, workData);

      if (thumbnailInputRef.current) {
        thumbnailInputRef.current.value = "";
      }

      if (descriptionImageInputRef.current) {
        descriptionImageInputRef.current.value = "";
      }

      setWork((prevWork) =>
        prevWork
          ? {
              ...prevWork,
              ...workData,
            }
          : prevWork,
      );
      setThumbnail(null);
      setDescriptionImage(null);
      setThumbnailURL(null);
      setDescriptionImageURL(null);
      setIsAlertVisible(true);
      setTagCheck("");
      setTitleCheck("");
    } catch (error) {
      alert(`WorksUpdateでエラーが発生しました。${error}`);
    }
  };

  const operationFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: "Thumbnail" | "DescriptionImage",
  ) => {
    if (e.target.files) {
      switch (target) {
        case "Thumbnail":
          if (thumbnailURL) {
            URL.revokeObjectURL(thumbnailURL);
          }
          setThumbnail(e.target.files[0]);
          setThumbnailURL(URL.createObjectURL(e.target.files[0]));
          break;
        case "DescriptionImage":
          if (descriptionImageURL) {
            URL.revokeObjectURL(descriptionImageURL);
          }
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
      <Head title={"WORKS更新"} description={"WORKS更新"} />
      <Sidebar />
      <main>
        <MainVisual image={"contact/mv.jpg"} />
        <Content>
          <div className="c-works-register">
            <SubPageTitle title={"WORKS更新"} sub={""} />
          </div>
          <SubContent>
            {isAlertVisible && (
              <Alert
                changeAlertVisible={changeAlertVisible}
                text={"WORKを更新しました。"}
              />
            )}
            <FormContainer>
              <form onSubmit={(e) => handleSubmit(e)}>
                <dl className="form-def">
                  <dt>タグ</dt>
                  <dd>
                    <input
                      type="text"
                      onChange={(e) => checkTagInput(e)}
                      value={tag}
                    />
                    {tagCheck && <p className="form-attention">{tagCheck}</p>}
                  </dd>
                </dl>
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
                      {thumbnailURL ? (
                        <img src={thumbnailURL} alt="" />
                      ) : (
                        work?.thumbnail && (
                          <img
                            src={PUBLIC_FOLDER + "work/" + work.thumbnail}
                            alt=""
                          />
                        )
                      )}
                    </p>
                    <input
                      type="file"
                      accept=".png, .jpeg, .jpg, image/svg+xml"
                      onChange={(e) => operationFile(e, "Thumbnail")}
                      ref={thumbnailInputRef}
                    />
                  </dd>
                </dl>
                <dl className="form-def">
                  <dt>詳細画像</dt>
                  <dd>
                    <p className="form-image-show">
                      {descriptionImageURL ? (
                        <img src={descriptionImageURL} alt="" />
                      ) : (
                        work?.descriptionImage && (
                          <img
                            src={
                              PUBLIC_FOLDER + "work/" + work.descriptionImage
                            }
                            alt=""
                          />
                        )
                      )}
                    </p>
                    <input
                      type="file"
                      accept=".png, .jpeg, .jpg, image/svg+xml"
                      onChange={(e) => operationFile(e, "DescriptionImage")}
                      ref={descriptionImageInputRef}
                    />
                  </dd>
                </dl>
                <div className="contact-button">
                  <Button
                    buttonType={"button"}
                    text={"更新する"}
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
