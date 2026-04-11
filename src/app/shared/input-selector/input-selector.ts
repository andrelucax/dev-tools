import { Component, computed, EventEmitter, inject, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FilesInput } from '../files-input/files-input';
import { EncodedInput, InputEncodingFormat } from '../converter/converter';

@Component({
  selector: 'dt-input-selector',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatButtonModule,
    FilesInput
  ],
  templateUrl: './input-selector.html',
  styleUrl: './input-selector.scss',
})
export class InputSelector {

  private readonly fb = inject(FormBuilder);

  @Output() valueSubmited = new EventEmitter<EncodedInput>();
  @Output() valueReseted = new EventEmitter<null>();
  @Input() allowedTypes: InputEncodingFormat[] = ['utf8', 'b64', 'hex', 'file'];
  @Input() submitButtonText = "Submit";

  private readonly encodingTypes: { label: string; value: InputEncodingFormat }[] = [
    { label: 'Base64', value: 'b64' },
    { label: 'Hex', value: 'hex' },
    { label: 'UTF-8', value: 'utf8' },
    { label: 'File', value: 'file' }
  ];

  protected filteredEncodingTypes = computed(() =>
    this.encodingTypes.filter(t => this.allowedTypes.includes(t.value))
  );

  protected submited = false;

  protected form = this.fb.group({
    encodingType: this.fb.control<InputEncodingFormat>('utf8', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    inputValue: this.fb.control<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    inputFile: this.fb.control<string[] | null>(null)
  });

  constructor() {
    this.form.controls.encodingType.valueChanges.pipe(
      takeUntilDestroyed()
    ).subscribe(v => {
      if (v == 'file') {
        this.form.controls.inputValue.clearValidators();
        this.form.controls.inputFile.setValidators([Validators.required]);
      } else {
        this.form.controls.inputValue.setValidators([Validators.required]);
        this.form.controls.inputFile.clearValidators();
      }
      this.form.controls.inputValue.updateValueAndValidity();
      this.form.controls.inputFile.updateValueAndValidity();
    })
  }

  protected submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    let value = this.form.value.inputValue!;
    const encodingType = this.form.value.encodingType!;
    if (encodingType == 'file') {
      const file = this.form.value.inputFile?.[0];

      if (!file) {
        this.form.markAllAsTouched();
        return;
      }

      value = file;
    }

    this.form.disable();
    this.submited = true;
    this.valueSubmited.emit({ value: value, encoding: encodingType });
  }

  protected reset() {
    this.form.enable();
    this.submited = false;
    this.valueReseted.emit();
  }
}
