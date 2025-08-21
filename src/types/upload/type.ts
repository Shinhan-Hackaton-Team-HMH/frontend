export interface UploadImage {
  url: string;
  imageTemplate: number;
}

export interface UploadTemplate extends UploadImage {
  adText: string;
}
