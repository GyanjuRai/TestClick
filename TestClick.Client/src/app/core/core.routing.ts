import { Route } from "@angular/router";

export const coreRoutes: Route[] = [
    {
        path: '',
        loadChildren: () => import('./inv/inv.module').then(m => m.InvModule)
    }
];