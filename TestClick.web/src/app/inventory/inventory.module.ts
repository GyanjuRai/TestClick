import { NgModule } from "@angular/core";
import { ScreenListComponent } from "./screen/component/screen-list/screen-list.component";
import { SharedUiModule } from "../shared";
import { RouterModule } from "@angular/router";
import { invRoutes } from "./inventory.routes";
import { ScreenAddEditComponent } from './screen/component/screen-add-edit/screen-add-edit.component';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        ScreenListComponent,
        ScreenAddEditComponent
    ],
    imports: [
        CommonModule,
        SharedUiModule,
        FormsModule,
        RouterModule.forChild(invRoutes),
    ],
    providers: [],
    exports: []
})

export class InventoryModule {}