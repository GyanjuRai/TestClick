import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { ScreenModule } from './core/screen/screen.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inv',
    pathMatch: 'full'
  },
  {
    path: 'inv',
    // loadChildren: () => ScreenModule --Eager loading
    loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule)
  },
  {
    path: '**',
    redirectTo: 'inv'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
