import { Injectable, Type } from '@angular/core';
import { Route } from '@angular/router';
import { HashPage } from '../../pages/hash-page/hash-page';
import { GeneratorPage } from '../../pages/generator-page/generator-page';
import { LocationPage } from '../../pages/location-page/location-page';
import { UserAgentPage } from '../../pages/user-agent-page/user-agent-page';
import { ConverterPage } from '../../pages/converter-page/converter-page';
import { ClipboardPage } from '../../pages/clipboard-page/clipboard-page';

export interface ComponentItem {
  externalRedirect?: string;
  name: string;
  id: string;
  icon: string;
  requiresServer?: boolean;
  component: Type<any>;
}

const ITEMS: ComponentItem[] = [
  // {
  //   name: 'Clipboard',
  //   id: 'clipboard',
  //   icon: "copy_all",
  //   requiresServer: true,
  //   component: ClipboardPage
  // },
  {
    name: 'User-Agent',
    id: 'user-agent',
    icon: "language",
    requiresServer: true,
    component: UserAgentPage
  },
  {
    name: 'Converter',
    id: 'converter',
    icon: "swap_horiz",
    component: ConverterPage
  },
  {
    name: 'Location',
    id: 'location',
    icon: "location_on",
    component: LocationPage
  },
  {
    name: 'Generator',
    id: 'generator',
    icon: "casino",
    component: GeneratorPage
  },
  {
    name: 'Hash',
    id: 'hash',
    icon: "lock",
    component: HashPage
  },
];

export const COMPONENT_ITEMS_ROUTES: Route[] = ITEMS.map(item => ({
  path: item.id,
  component: item.component
}));

@Injectable({
  providedIn: 'root',
})
export class ComponentItems {

  getItems() {
    return ITEMS;
  }
}
