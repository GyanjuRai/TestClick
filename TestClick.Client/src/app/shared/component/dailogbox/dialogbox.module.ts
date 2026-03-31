import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { DialogboxComponent } from './dialogbox.component';

@NgModule({
  declarations: [
    DialogboxComponent
  ],
  imports: [
    CommonModule,
    OverlayModule,
  ],
  providers: [],
  exports: [
    DialogboxComponent
  ]
})
export class DialogboxModule { }
