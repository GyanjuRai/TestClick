import { Routes } from '@angular/router';
import { ScreenListComponent } from './screen/component/screen-list/screen-list.component';
import { ROUTE_PATHS } from '../shared/routing/route-paths.const';

export const invRoutes = [
  {
    path: ROUTE_PATHS.INVENTORY_SCREEN,
    component: ScreenListComponent,
  },
  {
    path: '',
    redirectTo: ROUTE_PATHS.INVENTORY_SCREEN,
    pathMatch: 'full',
  },
] as Routes;
