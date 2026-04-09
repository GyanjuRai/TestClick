import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { invRoutes } from "./inventory.routes";
import { ScreenModule } from "./screen/screen.module";


@NgModule({
    imports: [
        RouterModule.forChild(invRoutes),
        ScreenModule,
    ],
})

export class InventoryModule {}