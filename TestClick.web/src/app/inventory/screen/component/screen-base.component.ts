import { inject } from "@angular/core";
import { ScreenService } from "../service/screen.service";
import { ROUTE_PATHS } from "../../../shared/routing/route-paths.const";
import { ConfirmationService, MessageService } from "primeng/api";

export class ScreenBaseComponent {
    protected _screenService = inject(ScreenService);
    protected _confirmationService = inject(ConfirmationService);
    protected _messageService = inject(MessageService)
    protected routes = ROUTE_PATHS;
    constructor() {}

}