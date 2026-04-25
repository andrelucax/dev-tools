export interface ClipboardRequest {
  text: string | null;
  file: string | null;
}

export interface ClipboardModel {
  code: string;
  copyUrl: string | null;
  text: string | null;
  fileUrl: string | null;
}
