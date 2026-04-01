import { Component, Inject } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  DIALOG_DATA,
  DialogRef,
} from '../../../../shared/component/dailogbox/dialogboxRef';

@Component({
  selector: 'screenConfirmationbox',
  templateUrl: './screen-confirmationbox.component.html',
  styleUrl: './screen-confirmationbox.component.scss',
})
export class ScreenConfirmationboxComponent {
  faTrash = faTrash as any;

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: ConfirmationData,
  ) {}

  cancel() {
    this.dialogRef.close(false);
  }

  confirm() {
    this.dialogRef.close(true);
  }
}

export interface ConfirmationData {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
}
