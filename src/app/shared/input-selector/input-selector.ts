import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export type InputSelectorTypes = 'utf8' | 'b64' | 'hex' | 'file';

@Component({
  selector: 'dt-input-selector',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatButtonModule
  ],
  templateUrl: './input-selector.html',
  styleUrl: './input-selector.scss',
})
export class InputSelector {

  private readonly fb = inject(FormBuilder);

  @Output() valueSubmited = new EventEmitter<{ value: string, type: InputSelectorTypes }>();
  @Output() valueReseted = new EventEmitter<null>();
  @Input() allowedTypes: InputSelectorTypes[] = ['utf8', 'b64', 'hex', 'file'];
  @Input() submitButtonText = "Submit";

  protected submited = false;

  protected form = this.fb.group({
    inputType: this.fb.control<InputSelectorTypes>('utf8', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    inputValue: this.fb.control<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    inputFile: this.fb.control<File | null>(null)
  });

  constructor() {
    this.form.controls.inputType.valueChanges.pipe(
      takeUntilDestroyed()
    ).subscribe(v => {
      if (v == 'file') {
        this.form.controls.inputValue.clearValidators();
        this.form.controls.inputFile.setValidators([Validators.required]);
      } else {
        this.form.controls.inputValue.setValidators([Validators.required]);
        this.form.controls.inputFile.clearValidators();
      }
    })
  }

  protected submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    let value = this.form.value.inputValue!;
    if (this.form.value.inputType == 'file') {
      // TODO
    }

    this.form.disable();
    this.submited = true;
    this.valueSubmited.emit({ value: value, type: this.form.value.inputType! });
  }

  protected reset() {
    this.form.enable();
    this.submited = false;
    this.valueReseted.emit();
  }
}
