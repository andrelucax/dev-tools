export interface FileModel {
  name: string;
  contentType: string;
  url: string;
}

export interface FileRequest {
  name: string;
  contentType: string;
  base64: string; // TODO upload segmentaly and save a Guid
}
