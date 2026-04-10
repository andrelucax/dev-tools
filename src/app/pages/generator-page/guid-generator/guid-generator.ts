import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ClipboardOutput } from '../../../shared/clipboard-output/clipboard-output';

@Component({
  selector: 'dt-guid-generator',
  imports: [
    MatButtonModule,
    ClipboardOutput
  ],
  templateUrl: './guid-generator.html',
  styleUrl: './guid-generator.scss',
})
export class GuidGenerator {
  protected output: string = "";

  protected generate() {
    this.output = crypto.randomUUID();
  }
}
