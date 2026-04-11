import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
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
export class FilesInput {

  private readonly fb = inject(FormBuilder);

  @Input() label: string = "";
  @Input() single: boolean = false;

  protected form = this.fb.group({
    files: this.fb.array<FormControl<File>>([])
  });

  fileSelected(event: Event) {
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
  }

  removeFile(index: number) {
    this.form.controls.files.removeAt(index);
  }
}
