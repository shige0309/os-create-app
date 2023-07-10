import axios from "axios";
import { BlogType, NewImageType, UploadImageData, WorkType } from "Type";

export const useUploadImage = () => {
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const prepareAndUploadImages = (
    folder: string,
    thumbnail: File | null,
    descriptionImage: File | null,
    uploadData: BlogType | WorkType,
    newData: BlogType | WorkType,
  ): BlogType | WorkType => {
    const images: NewImageType = {
      thumbnail: thumbnail || null,
      descriptionImage: descriptionImage || null,
    };

    const nowDate: number = Date.now();

    uploadImagesToServer(images, nowDate, folder);

    const uploadImageData: UploadImageData = {
      thumbnail:
        thumbnail !== null ? nowDate + "-thumbnail-" + thumbnail.name : "",
      descriptionImage:
        descriptionImage !== null
          ? nowDate + "-descriptionImage-" + descriptionImage.name
          : "",
    };

    uploadData = { ...newData, ...uploadImageData };

    return uploadData;
  };

  const uploadImagesToServer = async (
    images: Record<string, File | null>,
    nowDate: number,
    folder: string,
  ) => {
    await Promise.all(
      Object.entries(images)
        .filter(([image]) => image !== null)
        .map(async ([type, image]) => {
          if (image!.size > 2 * 1024 * 1024) {
            alert(
              "ファイルサイズが大きすぎます。2MB以下のファイルを選択してください。",
            );
            return;
          }

          const data = new FormData();

          let fileName;
          if (type === "thumbnail") {
            fileName = nowDate + "-thumbnail-" + image!.name;
          } else if (type === "descriptionImage") {
            fileName = nowDate + "-descriptionImage-" + image!.name;
          } else {
            fileName = nowDate + image!.name;
          }

          data.append("name", fileName);
          data.append("file", image!);
          data.append("folder", folder);

          try {
            await axios.post(REACT_APP_BACKEND_URL + "/imageUpload", data);
          } catch (error) {
            alert(`画像のアップロードに失敗しました。${error}`);
          }
        }),
    );
  };

  return { prepareAndUploadImages };
};
