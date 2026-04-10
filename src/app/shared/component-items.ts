import { Injectable } from '@angular/core';

export interface ComponentItem {
  externalRedirect?: string;
  name: string;
  id: string;
}

const ITEMS: ComponentItem[] = [
  {
    name: 'Clipboard',
    id: 'clipboard'
  },
];

@Injectable({
  providedIn: 'root',
})
export class ComponentItems {

  getItems() {
    return ITEMS;
  }
}
