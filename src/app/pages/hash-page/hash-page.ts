import { Component, computed, inject, signal } from '@angular/core';
import { InputSelector, InputSelectorTypes } from '../../shared/input-selector/input-selector';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClipboardOutput } from '../../shared/clipboard-output/clipboard-output';
import { LoadingService } from '../../shared/loading-service/loading-service';
import { MessageService } from '../../shared/message-service/message-service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import * as CryptoJS from 'crypto-js';
import { map, startWith } from 'rxjs';

type HashTypes = 'md5' | 'sha1' | 'sha256' | 'sha384' | 'sha512';
type OutputTypes = 'hex' | 'b64';

@Component({
  selector: 'dt-hash-page',
  imports: [
    InputSelector,
    MatButtonToggleModule,
    ReactiveFormsModule,
    ClipboardOutput
  ],
  templateUrl: './hash-page.html',
  styleUrl: './hash-page.scss',
})
export class HashPage {

  private readonly fb = inject(FormBuilder);
  private readonly loadingService = inject(LoadingService);
  private readonly messageService = inject(MessageService);

  protected value = signal<string>("");

  protected outputValue = computed(() => {
    const value = this.value();
    const outputType = this.outputType();
    switch (outputType) {
      case 'b64':
        return this.hexToBase64(value);
      case 'hex':
        return value;
      default:
        throw new Error("Not implemented");
    }
  });

  private input?: Uint8Array;

  protected form = this.fb.group({
    hashType: this.fb.control<HashTypes>('sha256', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    outputType: this.fb.control<OutputTypes>('hex', {
      nonNullable: true,
      validators: [Validators.required]
    }),
  });

  protected outputType = toSignal(
    this.form.valueChanges.pipe(
      map(v => v.outputType),
      startWith(this.form.value.outputType)
    )
  );

  constructor() {
    this.form.controls.hashType.valueChanges.pipe(
      takeUntilDestroyed()
    ).subscribe(ht => {
      if (!this.input) {
        return;
      }
      this.computeHashByType(this.input, ht);
    });
  }

  private  async computeHashByType(bytes: Uint8Array, type: HashTypes) {
    this.loadingService.show();

    let hash: string;
    try {
      switch (type) {
        case 'md5':
          hash = CryptoJS.MD5(
            CryptoJS.lib.WordArray.create(bytes)
          ).toString().toUpperCase();
          break;
        case 'sha1':
          hash = await this.sha1(bytes);
          break;
        case 'sha256':
          hash = await this.sha256(bytes);
          break;
        case 'sha384':
          hash = await this.sha384(bytes);
          break;
        case 'sha512':
          hash = await this.sha512(bytes);
          break;
        default:
          throw new Error("Not implemented");
      }
    } catch (err) {
      this.messageService.showError("Failed to calculate hash");
      throw (err);
    } finally {
      this.loadingService.hide();
    }

    this.value.set(hash);
  }

  protected async setInputAndComputeHash(input: { value: string, type: InputSelectorTypes }) {
    const bytes = this.toBytes(input);
    this.input = bytes;
    return await this.computeHashByType(bytes, this.form.value.hashType!);
  }

  private toBytes(input: { value: string, type: InputSelectorTypes }): Uint8Array {
    switch (input.type) {
      case 'utf8':
        return new TextEncoder().encode(input.value);
      case 'b64': {
        const binary = atob(input.value);
        return Uint8Array.from(binary, c => c.charCodeAt(0));
      }
      case 'hex':
        return this.hexToBytes(input.value);
      case 'file':
        throw new Error("Not implemented yet");
      default:
        throw new Error("Not implemented");
    }
  }

  private hexToBytes(hex: string): Uint8Array {
    if (hex.length % 2 !== 0) {
      throw new Error("Invalid hex string");
    }

    const bytes = new Uint8Array(hex.length / 2);

    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    }

    return bytes;
  }

  protected resetValue() {
    this.value.set("");
  }

  private async sha1(bytes: Uint8Array): Promise<string> {
    return await this.getHashValue(bytes, "SHA-1");
  }

  private async sha256(bytes: Uint8Array): Promise<string> {
    return await this.getHashValue(bytes, "SHA-256");
  }

  private async sha384(bytes: Uint8Array): Promise<string> {
    return await this.getHashValue(bytes, "SHA-384");
  }

  private async sha512(bytes: Uint8Array): Promise<string> {
    return await this.getHashValue(bytes, "SHA-512");
  }

  private async getHashValue(bytes: Uint8Array, digest: AlgorithmIdentifier): Promise<string> {
    const hashBuffer = await crypto.subtle.digest(digest, new Uint8Array(bytes).slice().buffer);
    return this.bufferToHex(hashBuffer).toUpperCase();
  }

  private bufferToHex(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);

    let hex = '';
    for (let i = 0; i < bytes.length; i++) {
      hex += bytes[i].toString(16).padStart(2, '0');
    }

    return hex;
  }

  private hexToBase64(hex: string) {
    const bytes = this.hexToBytes(hex);

    let binary = '';
    bytes.forEach(b => binary += String.fromCharCode(b));

    return btoa(binary);
  }
}
