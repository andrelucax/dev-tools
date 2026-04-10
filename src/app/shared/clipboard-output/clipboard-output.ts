import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'dt-clipboard-output',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './clipboard-output.html',
  styleUrl: './clipboard-output.scss',
})
export class ClipboardOutput {
  @Input({required: true}) output: string = "";
}
