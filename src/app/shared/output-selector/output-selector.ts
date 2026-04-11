import { Component, computed, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Converter, EncodedInput, EncodedOutput, OutputEncodingFormat } from '../converter/converter';
import { ClipboardOutput } from '../clipboard-output/clipboard-output';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'dt-output-selector',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatButtonModule,
    ClipboardOutput
  ],
  templateUrl: './output-selector.html',
  styleUrl: './output-selector.scss',
})
export class OutputSelector {

  private readonly fb = inject(FormBuilder);

  @Output() valueSubmited = new EventEmitter<EncodedOutput>();
  @Output() valueReseted = new EventEmitter<null>();
  @Input() allowedTypes: OutputEncodingFormat[] = ['hex', 'b64', 'file'];

  private _value = signal<EncodedInput>(null as any);

  @Input()
  set value(v: EncodedInput) {
    this._value.set(v);
  }

  protected output = computed(() => {
    switch (this.encodingType()) {
      case 'b64':
        return Converter.bufferToBase64(Converter.toBytes(this._value()));
      case 'hex':
        return Converter.bufferToHex(Converter.toBytes(this._value()));
      case 'file':
        return Converter.toBytes(this._value());
      default:
        throw new Error("Not implemented");
    }
  });

  protected outputStr = computed(() => {
    const output = this.output();

    if (typeof output !== 'string') {
      throw new Error("Not implemented");
    }

    return output;
  });

  protected outputBuffer = computed(() => {
    const output = this.output();

    if (!(output instanceof Uint8Array)) {
      throw new Error("Not implemented");
    }

    return output;
  });

  private readonly encodingTypes: { label: string; value: OutputEncodingFormat }[] = [
    { label: 'Hex', value: 'hex' },
    { label: 'Base64', value: 'b64' },
    { label: 'File', value: 'file' }
  ];

  protected filteredEncodingTypes = computed(() =>
    this.encodingTypes.filter(t => this.allowedTypes.includes(t.value))
  );

  protected submited = false;

  protected form = this.fb.group({
    encodingType: this.fb.control<OutputEncodingFormat>('hex', {
      nonNullable: true,
      validators: [Validators.required]
    }),
  });

  protected encodingType = toSignal(
    this.form.controls.encodingType.valueChanges,
    { initialValue: this.form.controls.encodingType.value }
  );

  downloadFile() {
    const bytes = this.outputBuffer();

    const blob = new Blob([bytes.slice().buffer], {
      type: 'application/octet-stream',
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `converted-${Date.now()}.bin`;
    a.click();

    URL.revokeObjectURL(url);
  }
}
