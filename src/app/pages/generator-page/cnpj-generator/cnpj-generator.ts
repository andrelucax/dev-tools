import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ClipboardOutput } from '../../../shared/clipboard-output/clipboard-output';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'dt-cnpj-generator',
  imports: [
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatButtonModule,
    ClipboardOutput
  ],
  templateUrl: './cnpj-generator.html',
  styleUrl: './cnpj-generator.scss',
})
export class CnpjGenerator {
  private readonly fb = inject(FormBuilder);

  private cnpj: string = "";
  protected output: string = "";

  protected form = this.fb.group({
    mask: [true, Validators.required],
    alphanumeric: [true, Validators.required]
  });

  constructor() {
    this.form.controls.mask.valueChanges.pipe(
      takeUntilDestroyed()
    ).subscribe(v => {
      this.setOutput(v);
    })
  }

  protected generate() {
    let chars = "0123456789";

    if (this.form.value.alphanumeric) {
      chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    const randomBase = Array.from({ length: 12 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    );

    const calcCheckDigit = (arr: (string | number)[], weights: number[]) => {
      let sum = 0;

      for (let i = 0; i < arr.length; i++) {
        sum += this.toValue(arr[i]) * weights[i];
      }

      const rest = sum % 11;
      return rest < 2 ? 0 : 11 - rest;
    };

    const d1 = calcCheckDigit(randomBase, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    const d2 = calcCheckDigit([...randomBase, d1], [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

    const cnpj = [...randomBase, d1, d2].join("");

    this.cnpj = cnpj;

    this.setOutput(this.form.value.mask);
  }

  private toValue(char: string | number): number {
    if (typeof char === "number") return char;

    // ASCII - 48
    return char.charCodeAt(0) - 48;
  }

  private setOutput(mask: boolean | null | undefined) {
    if (!this.cnpj) {
      return;
    }

    this.output = this.cnpj;

    if (mask) {
      this.output = this.cnpj.replace(/^(.{2})(.{3})(.{3})(.{4})(.{2})$/, "$1.$2.$3/$4-$5");
    }
  }
}
