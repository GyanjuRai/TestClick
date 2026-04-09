import { Component, inject, Injector } from '@angular/core';
import { ROUTE_PATHS } from './shared/routing/route-paths.const';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected _confirmationService: ConfirmationService;
  protected _messageService: MessageService;

  protected routes = ROUTE_PATHS;

  constructor(injector: Injector) {
    this._confirmationService = injector.get(ConfirmationService);
    this._messageService = injector.get(MessageService);
  }
}
