import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridConfigComponent } from './grid-config.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    GridConfigComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    GridConfigComponent,
  ]
})
export class GridConfigModule { }