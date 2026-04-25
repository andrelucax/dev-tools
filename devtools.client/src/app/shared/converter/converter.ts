import { FileRequest } from "../../api/files";

export type InputEncodingFormat = 'utf8' | 'b64' | 'hex' | 'file';
export type OutputEncodingFormat = 'b64' | 'hex' | 'file';

export interface EncodedInput {
  text?: string | null;
  file?: FileRequest | null;
  encoding: InputEncodingFormat;
}

export interface EncodedOutput {
  value: string;
  encoding: OutputEncodingFormat;
}

export class Converter {
  static toBytes(input: EncodedInput): Uint8Array {
    switch (input.encoding) {
      case 'utf8':
        return new TextEncoder().encode(input.text!);
      case 'b64': {
        const binary = atob(input.text!);
        return Uint8Array.from(binary, c => c.charCodeAt(0));
      }
      case 'hex':
        return this.hexToBytes(input.text!);
      case 'file':
        const binary = atob(input.file!.base64);
        return Uint8Array.from(binary, c => c.charCodeAt(0));
      default:
        throw new Error("Not implemented");
    }
  }

  static hexToBytes(hex: string): Uint8Array {
    if (hex.length % 2 !== 0) {
      throw new Error("Invalid hex string");
    }

    const bytes = new Uint8Array(hex.length / 2);

    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    }

    return bytes;
  }

  static bufferToBase64(data: Uint8Array): string {
    let binary = '';

    for (let i = 0; i < data.length; i++) {
      binary += String.fromCharCode(data[i]);
    }

    return btoa(binary);
  }

  static bufferToHex(buffer: ArrayBuffer | Uint8Array): string {
    const bytes = buffer instanceof Uint8Array
      ? buffer
      : new Uint8Array(buffer);

    let hex = '';
    for (let i = 0; i < bytes.length; i++) {
      hex += bytes[i].toString(16).padStart(2, '0');
    }

    return hex;
  }

  static hexToBase64(hex: string) {
    const bytes = Converter.hexToBytes(hex);

    let binary = '';
    bytes.forEach(b => binary += String.fromCharCode(b));

    return btoa(binary);
  }

}
