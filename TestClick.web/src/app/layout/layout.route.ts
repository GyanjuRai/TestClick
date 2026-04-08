import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/component/main-layout.component';
import { ROUTE_PATHS } from '../shared/routing/route-paths.const';

export const layoutRoutes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: ROUTE_PATHS.INVENTORY,
        loadChildren: () =>
          import('../inventory/inventory.module').then(
            (c) => c.InventoryModule,
          ),
      },
      {
        path: '',
        redirectTo: ROUTE_PATHS.INVENTORY,
        pathMatch: 'full',
      },
    ],
  },
] as Routes;
