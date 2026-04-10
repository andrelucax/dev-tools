import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { COMPONENT_ITEMS_ROUTES } from './shared/component-items';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: COMPONENT_ITEMS_ROUTES
  }
];
