import { Component, computed, inject, signal } from '@angular/core';
import { InputSelector } from '../../shared/input-selector/input-selector';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingService } from '../../shared/loading-service/loading-service';
import { MessageService } from '../../shared/message-service/message-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as CryptoJS from 'crypto-js';
import { MatDividerModule } from '@angular/material/divider';
import { Converter, EncodedInput } from '../../shared/converter/converter';
import { OutputSelector } from '../../shared/output-selector/output-selector';

type HashTypes = 'md5' | 'sha1' | 'sha256' | 'sha384' | 'sha512';

@Component({
  selector: 'dt-hash-page',
  imports: [
    InputSelector,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatDividerModule,
    OutputSelector
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
    const output: EncodedInput = {
      text: value,
      encoding: 'hex'
    }
    return output;
  });

  private input?: Uint8Array;

  protected form = this.fb.group({
    hashType: this.fb.control<HashTypes>('sha256', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

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

  private async computeHashByType(bytes: Uint8Array, type: HashTypes) {
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

  protected async setInputAndComputeHash(input: EncodedInput) {
    const bytes = Converter.toBytes(input);
    this.input = bytes;
    await this.computeHashByType(bytes, this.form.value.hashType!);
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
    return Converter.bufferToHex(hashBuffer).toUpperCase();
  }
}
