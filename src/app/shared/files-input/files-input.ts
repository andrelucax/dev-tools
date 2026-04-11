import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormControl, ControlValueAccessor, NgControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'dt-files-input',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './files-input.html',
  styleUrl: './files-input.scss',
})
export class FilesInput implements ControlValueAccessor {

  private readonly fb = inject(FormBuilder);

  @Input() label: string = "";
  @Input() single: boolean = false;

  protected form = this.fb.group({
    files: this.fb.array<FormControl<File>>([])
  });

  async fileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files) return;

    const files = Array.from(input.files);

    if (this.single) {
      this.form.controls.files.clear();
      const file = files[0];
      const control = new FormControl<File>(file, { nonNullable: true });
      this.form.controls.files.push(control);
    } else {
      for (const file of files) {
        if (!file) {
          continue;
        }

        const control = new FormControl<File>(file, { nonNullable: true });
        this.form.controls.files.push(control);
      }
    }

    input.value = '';
    await this.setFileUpdated(this.form.value.files!);
  }

  removeFile(index: number) {
    this.form.controls.files.removeAt(index);
    this.setFileUpdated(this.form.value.files ?? null);
  }

  fileTouched() {
    this.onTouched();
  }

  //#region ControlValueAccessor

  private readonly ngControl = inject(NgControl, { self: true, optional: true });

  get invalid() {
    const c = this.ngControl?.control;
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  private onChange: (value: string[] | null) => void = () => { };
  private onTouched: () => void = () => { };
  protected disabled = false;

  value: string[] | null = null;

  writeValue(value: string[] | null): void {
    this.value = value ?? null;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private async setFileUpdated(files: File[] | null) {
    if (files) {
      this.writeValue(await this.toBase64(files));
    } else {
      this.writeValue(null);
    }
    this.onChange(this.value);
  }

  private toBase64(files: File[]) {
    return Promise.all(files.map(f => this.fileToBase64(f)));
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };

      reader.onerror = reject;
    });
  }

  // #endregion
}
