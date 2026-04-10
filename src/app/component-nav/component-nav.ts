import { Component, inject } from '@angular/core';
import { ComponentItems } from '../shared/component-items';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'dt-component-nav',
  imports: [
    MatListModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './component-nav.html',
  styleUrl: './component-nav.scss',
})
export class ComponentNav {

  private _componentItems = inject(ComponentItems);

  protected items = this._componentItems.getItems();
}
