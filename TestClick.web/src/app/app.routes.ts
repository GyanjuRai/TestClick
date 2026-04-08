import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/component/main-layout.component';

export const appRoutes = [
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
] as Routes;
