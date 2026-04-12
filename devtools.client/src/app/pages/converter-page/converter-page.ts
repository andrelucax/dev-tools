import { Component, signal } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { InputSelector } from '../../shared/input-selector/input-selector';
import { EncodedInput } from '../../shared/converter/converter';
import { OutputSelector } from '../../shared/output-selector/output-selector';

@Component({
  selector: 'dt-converter-page',
  imports: [
    MatDividerModule,
    InputSelector,
    OutputSelector
  ],
  templateUrl: './converter-page.html',
  styleUrl: './converter-page.scss',
})
export class ConverterPage {

  protected value = signal<EncodedInput | null>(null);

  protected setInput(input: EncodedInput) {
    this.value.set(input);
  }

  protected resetInput() {
    this.value.set(null);
  }
}
