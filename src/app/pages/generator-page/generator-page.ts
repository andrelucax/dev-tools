import { Component } from '@angular/core';
import { GeneratorSelector } from './generator-selector/generator-selector';

@Component({
  selector: 'dt-generator-page',
  imports: [
    GeneratorSelector
  ],
  templateUrl: './generator-page.html',
  styleUrl: './generator-page.scss',
})
export class GeneratorPage {}
