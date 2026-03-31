import { Route } from "@angular/router";
import { ScreenListComponent } from "./screen/component/screen-list/screen-list.component";

export const inventoryRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'screen',
        pathMatch: 'full'
      },
      {
        path: 'screen',
        component: ScreenListComponent
      }
];