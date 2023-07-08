export type AdminType = {
  email: string;
  password: string;
};

export type WorkType = {
  adminId: string;
  tag: string;
  title: string;
  thumbnail: string;
  descriptionImage: string;
};

export type BlogType = {
  adminId: string;
  title: string;
  content: string;
  thumbnail: string;
  descriptionImage: string;
};

export type NewImageType = {
  thumbnail: File | null;
  descriptionImage: File | null;
};

export type UploadImageData = {
  thumbnail: string;
  descriptionImage: string;
};

export type ImageType = {
  thumbnail: File | null;
  descriptionImage: File | null;
};

export type GetBlogType = {
  _id: string;
  adminId: string;
  title: string;
  content: string;
  thumbnail: string;
  descriptionImage: string;
  createdAt: string;
  updatedAt: string;
};

export type GetWorkType = {
  _id: string;
  adminId: string;
  tag: string;
  title: string;
  thumbnail: string;
  descriptionImage: string;
  createdAt: string;
  updatedAt: string;
};

export type InputFormType = {
  name: string;
  email: string;
  content: string;
};
