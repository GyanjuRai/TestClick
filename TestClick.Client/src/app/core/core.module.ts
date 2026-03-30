import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { coreRoutes } from './core.routing';
import { GridConfigModule } from "../shared/component/grid-config/grid-config.module";

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(coreRoutes),
    GridConfigModule,
]
})
export class CoreModule { }
