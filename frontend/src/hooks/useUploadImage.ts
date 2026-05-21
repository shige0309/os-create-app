import axios from "axios";
import { BlogType, NewImageType, UploadImageData, WorkType } from "Type";

const MAX_IMAGE_FILE_SIZE_MB = 5;
const MAX_IMAGE_FILE_SIZE = MAX_IMAGE_FILE_SIZE_MB * 1024 * 1024;
const IMAGE_CONTENT_TYPES_BY_EXTENSION: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  svg: "image/svg+xml",
};

const getImageContentType = (image: File): string => {
  if (image.type) {
    return image.type;
  }

  const extension = image.name.split(".").pop()?.toLowerCase();

  return extension ? IMAGE_CONTENT_TYPES_BY_EXTENSION[extension] || "" : "";
};

const getUploadErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;

    if (typeof responseData === "string") {
      return responseData;
    }

    if (responseData) {
      return JSON.stringify(responseData);
    }

    return error.message;
  }

  return error instanceof Error ? error.message : String(error);
};

export const useUploadImage = () => {
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const prepareAndUploadImages = async (
    folder: string,
    thumbnail: File | null,
    descriptionImage: File | null,
    uploadData: BlogType | WorkType,
    newData: BlogType | WorkType,
  ): Promise<BlogType | WorkType> => {
    const images: NewImageType = {
      thumbnail: thumbnail || null,
      descriptionImage: descriptionImage || null,
    };

    const nowDate: number = Date.now();

    await uploadImagesToServer(images, nowDate, folder);

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
    const uploadImages = Object.entries(images).filter(
      (entry): entry is [string, File] => entry[1] !== null,
    );

    const oversizedImage = uploadImages.find(
      ([, image]) => image.size > MAX_IMAGE_FILE_SIZE,
    );

    if (oversizedImage) {
      throw new Error(
        `ファイルサイズが大きすぎます。${MAX_IMAGE_FILE_SIZE_MB}MB以下のファイルを選択してください。`,
      );
    }

    await Promise.all(
      uploadImages.map(async ([type, image]) => {
        let fileName;
        if (type === "thumbnail") {
          fileName = nowDate + "-thumbnail-" + image.name;
        } else if (type === "descriptionImage") {
          fileName = nowDate + "-descriptionImage-" + image.name;
        } else {
          fileName = nowDate + image.name;
        }

        const contentType = getImageContentType(image);

        try {
          const response = await axios.post(
            REACT_APP_BACKEND_URL + "/imageUpload/presigned",
            {
              name: fileName,
              folder,
              contentType,
              fileSize: image.size,
            },
          );

          await axios.put(response.data.uploadUrl, image, {
            headers: {
              "Content-Type": contentType,
            },
          });
        } catch (error) {
          throw new Error(
            `画像のアップロードに失敗しました。${getUploadErrorMessage(error)}`,
          );
        }
      }),
    );
  };

  return { prepareAndUploadImages };
};
