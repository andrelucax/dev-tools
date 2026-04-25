import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormControl, ControlValueAccessor, NgControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DragAndDrop } from './drag-and-drop';
import { FileRequest } from '../../api/files';

@Component({
  selector: 'dt-files-input',
  imports: [
    MatButtonModule,
    MatIconModule,
    DragAndDrop
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

    input.value = '';
    await this.selectFiles(files);
  }

  private async selectFiles(files: File[]) {
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

    await this.setFileUpdated(this.form.value.files!);
  }

  removeFile(index: number) {
    this.form.controls.files.removeAt(index);
    this.setFileUpdated(this.form.value.files ?? null);
  }

  fileTouched() {
    this.onTouched();
  }

  //#region DragAndDrop

  async onFilesDropped(files: File[]) {
    await this.selectFiles(files);
  }

  //#endregion

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

  private onChange: (value: FileRequest[] | null) => void = () => { };
  private onTouched: () => void = () => { };
  protected disabled = false;

  value: FileRequest[] | null = null;

  writeValue(value: FileRequest[] | null): void {
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
      this.writeValue(await this.toModel(files));
    } else {
      this.writeValue(null);
    }
    this.onChange(this.value);
  }

  private toModel(files: File[]) {
    return Promise.all(files.map(f => this.fileToFileRequest(f)));
  }

  private fileToFileRequest(file: File): Promise<FileRequest> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        const result = reader.result as string;
        const model: FileRequest = {
          name: file.name,
          contentType: file.type,
          base64: result.split(',')[1],
        };
        resolve(model);
      };

      reader.onerror = reject;
    });
  }

  // #endregion
}
