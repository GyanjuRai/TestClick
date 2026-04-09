import { NgModule } from "@angular/core";
import { ScreenListComponent } from "./component/screen-list/screen-list.component";
import { ScreenAddEditComponent } from "./component/screen-add-edit/screen-add-edit.component";
import { ScreenDetailComponent } from "./component/screen-detail/screen-detail.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedUiModule } from "../../shared";


@NgModule({
    declarations: [
        ScreenListComponent,
        ScreenAddEditComponent,
        ScreenDetailComponent
    ],
    imports: [
        CommonModule,
        SharedUiModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [],
    exports: [
        ScreenListComponent,
        ScreenAddEditComponent,
        ScreenDetailComponent,
        CommonModule,
        SharedUiModule,
    ]
})

export class ScreenModule {}