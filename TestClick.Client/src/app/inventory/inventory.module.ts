import { NgModule } from "@angular/core";
import { ScreenListComponent } from "./screen/component/screen-list/screen-list.component";
import { ScreenDialogboxComponent } from "./screen/component/screen-dialogbox/screen-dialogbox.component";
import { ScreenConfirmationboxComponent } from "./screen/component/screen-confirmationbox/screen-confirmationbox.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { GridConfigModule } from "../shared/component/grid-config/grid-config.module";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { inventoryRoutes } from "./inventory.routing";

@NgModule({
  declarations: [
    ScreenListComponent,
    ScreenDialogboxComponent,
    ScreenConfirmationboxComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(inventoryRoutes),
    GridConfigModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ]
})
export class InventoryModule { }
