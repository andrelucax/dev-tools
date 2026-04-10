import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ClipboardOutput } from '../../../shared/clipboard-output/clipboard-output';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'dt-cpf-generator',
  imports: [
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatButtonModule,
    ClipboardOutput
  ],
  templateUrl: './cpf-generator.html',
  styleUrl: './cpf-generator.scss',
})
export class CpfGenerator {
  private readonly fb = inject(FormBuilder);

  private cpf: string = "";
  protected output: string = "";

  protected form = this.fb.group({
    mask: [true, Validators.required]
  });

  constructor() {
    this.form.controls.mask.valueChanges.pipe(
      takeUntilDestroyed()
    ).subscribe(v => {
      this.setOutput(v);
    })
  }

  protected generate() {
    const randomDigits = Array.from({ length: 9 }, () =>
      Math.floor(Math.random() * 10)
    );

    const calcCheckDigit = (base: number[]) => {
      let sum = 0;
      let weight = base.length + 1;

      for (const num of base) {
        sum += num * weight--;
      }

      const rest = sum % 11;
      return rest < 2 ? 0 : 11 - rest;
    };

    const d1 = calcCheckDigit(randomDigits);
    const d2 = calcCheckDigit([...randomDigits, d1]);

    const cpf = [...randomDigits, d1, d2].join("");

    this.cpf = cpf;

    this.setOutput(this.form.value.mask);
  }

  private setOutput(mask: boolean | null | undefined) {
    if (!this.cpf) {
      return;
    }

    this.output = this.cpf;

    if (mask) {
      this.output = this.output.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
  }
}
