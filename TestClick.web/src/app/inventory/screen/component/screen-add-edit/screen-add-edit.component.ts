import { Component, EventEmitter, Input, Output } from '@angular/core';
import { mScreen } from '../../model/screen.model';
import { screenPlacementTypeEnum, screenStatusEnum, screenTypeEnum } from '../../../../shared/model/enum';
import { enumToOptions } from '../../../../shared';

@Component({
  selector: 'screen-add-edit',
  templateUrl: './screen-add-edit.component.html',
  styleUrl: './screen-add-edit.component.scss',
})
export class ScreenAddEditComponent {
  screenData = {} as mScreen;
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  isVisible = false;
  isViewMode = false;
  protected placementTypeOptions = enumToOptions(screenPlacementTypeEnum);
  protected screenTypeOptions = enumToOptions(screenTypeEnum);
  protected statusTypeOtpions = enumToOptions(screenStatusEnum);

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
    return this.screenData?.id ? 'Edit Screen' : 'Add Screen';
  }

  onSubmit(): void {
    const action = this.screenData?.id ? 'Edit' : 'Add';
    this.onSave.emit(action);
  }

  onClose(): void {
    this.close();
    this.onCancel.emit();
  }
}
