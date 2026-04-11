import { Component, inject } from '@angular/core';
import { InputSelector, InputSelectorTypes } from '../../shared/input-selector/input-selector';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClipboardOutput } from '../../shared/clipboard-output/clipboard-output';
import { LoadingService } from '../../shared/loading-service/loading-service';
import { MessageService } from '../../shared/message-service/message-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as CryptoJS from 'crypto-js';

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

  protected value?: string;

  private input?: { value: string, type: InputSelectorTypes };

  protected form = this.fb.group({
    hashType: this.fb.control<HashTypes>('sha256', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    outputType: this.fb.control<OutputTypes>('b64', {
      nonNullable: true,
      validators: [Validators.required]
    }),
  });

  constructor() {
    this.form.controls.hashType.valueChanges.pipe(
      takeUntilDestroyed()
    ).subscribe(ht => {
      if (!this.input) {
        return;
      }
      this.computeHashByType(this.input.value, ht);
    });
  }

  private  async computeHashByType(value: string, type: HashTypes) {
    this.loadingService.show();

    let hash: string;
    try {
      switch (type) {
        case 'md5':
          hash = CryptoJS.MD5(value).toString().toUpperCase();
          break;
        case 'sha1':
          hash = await this.sha1(value);
          break;
        case 'sha256':
          hash = await this.sha256(value);
          break;
        case 'sha384':
          hash = await this.sha384(value);
          break;
        case 'sha512':
          hash = await this.sha512(value);
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

    this.value = hash;
  }

  protected async setInputAndComputeHash(input: { value: string, type: InputSelectorTypes }) {
    this.input = input;
    return await this.computeHashByType(input.value, this.form.value.hashType!);
  }

  protected resetValue() {
    this.value = undefined;
  }

  private async sha1(input: string): Promise<string> {
    return await this.getHashValue(input, "SHA-1");
  }

  private async sha256(input: string): Promise<string> {
    return await this.getHashValue(input, "SHA-256");
  }

  private async sha384(input: string): Promise<string> {
    return await this.getHashValue(input, "SHA-384");
  }

  private async sha512(input: string): Promise<string> {
    return await this.getHashValue(input, "SHA-512");
  }

  private async getHashValue(input: string, digest: AlgorithmIdentifier): Promise<string> {
    const data = new TextEncoder().encode(input);
    const hashBuffer = await crypto.subtle.digest(digest, data);
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
}
