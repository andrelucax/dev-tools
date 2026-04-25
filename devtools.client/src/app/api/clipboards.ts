import { FileModel, FileRequest } from "./files";

export interface ClipboardRequest {
  text: string | null;
  file: FileRequest | null;
}

export interface ClipboardModel {
  code: string;
  copyUrl: string | null;
  text: string | null;
  file: FileModel | null;
}
