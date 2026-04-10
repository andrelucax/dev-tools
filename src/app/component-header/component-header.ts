import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'dt-component-header',
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './component-header.html',
  styleUrl: './component-header.scss',
})
export class ComponentHeader {

  @Output() toggleSidenav = new EventEmitter<void>();

  protected onToggle(): void {
    this.toggleSidenav.emit();
  }
}
