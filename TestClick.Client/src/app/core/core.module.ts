import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenComponent } from './inv/screen/screen.component';
import { RouterModule } from '@angular/router';
import { coreRoutes } from './core.routing';



@NgModule({
  declarations: [
    ScreenComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(coreRoutes)
  ]
})
export class CoreModule { }
