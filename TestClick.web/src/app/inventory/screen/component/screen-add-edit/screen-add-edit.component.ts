import { Component, EventEmitter, Input, Output } from '@angular/core';
import { mScreen } from '../../model/screen.model';

@Component({
  selector: 'screen-add-edit',
  templateUrl: './screen-add-edit.component.html',
  styleUrl: './screen-add-edit.component.scss',
})
export class ScreenAddEditComponent {
  @Input() screenData: mScreen | null = null;
  @Output() onSave = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  isVisible = false;
  isViewMode = false;

  open(): void {
    this.isViewMode = false;
    this.isVisible = true;
  }

  openViewMode(): void {
    this.isViewMode = true;
    this.isVisible = true;
  }

  close(): void {
    this.isVisible = false;
    this.isViewMode = false;
  }

  get dialogHeader(): string {
    if (this.isViewMode) return 'View Screen';
    return this.screenData ? 'Edit Screen' : 'Add Screen';
  }

  onSubmit(): void {
    this.onSave.emit();
  }

  onClose(): void {
    this.close();
    this.onCancel.emit();
  }
}
