import { Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { mScreen } from '../../model/screen.model';

@Component({
  selector: 'screen-detail',
  templateUrl: './screen-detail.component.html',
  styleUrl: './screen-detail.component.scss',
})
export class ScreenDetailComponent {
  @Input() screen!: mScreen;
  @Output() afterClose = new EventEmitter<void>();
  protected isOpen: boolean = false;

  constructor() {
  }

  public open() {
    this.isOpen = true;
  }

  protected close() {
    this.screen = {} as mScreen;
    this.isOpen = false;
    this.afterClose.emit();
  }
}
