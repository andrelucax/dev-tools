import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CnpjGenerator } from '../cnpj-generator/cnpj-generator';
import { CpfGenerator } from '../cpf-generator/cpf-generator';
import { GuidGenerator } from '../guid-generator/guid-generator';

@Component({
  selector: 'dt-generator-selector',
  imports: [
    MatTabsModule,
    CnpjGenerator,
    CpfGenerator,
    GuidGenerator
  ],
  templateUrl: './generator-selector.html',
  styleUrl: './generator-selector.scss',
})
export class GeneratorSelector {}
