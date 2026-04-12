import { Component } from '@angular/core';
import { GeneratorSelector } from './generator-selector/generator-selector';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'dt-generator-page',
  imports: [
    GeneratorSelector,
    MatDividerModule
  ],
  templateUrl: './generator-page.html',
  styleUrl: './generator-page.scss',
})
export class GeneratorPage {}
