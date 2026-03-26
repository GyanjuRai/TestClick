import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ScreenComponent } from './screen/screen.component';
import { GridConfigModule } from '../../shared/component/grid-config/grid-config.module';

const invRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'screen',
    pathMatch: 'full'
  },
  {
    path: 'screen',
    component: ScreenComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(invRoutes),
    GridConfigModule,
  ]
})
export class InvModule { }
