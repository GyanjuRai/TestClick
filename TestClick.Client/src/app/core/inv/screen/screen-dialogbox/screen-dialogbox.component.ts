import { Component, Inject, OnInit } from '@angular/core';
import {
  DIALOG_DATA,
  DialogRef,
} from '../../../../shared/component/dailogbox/dialogboxRef';
import { DialogData, DialogField } from '../../../../shared/component/dailogbox/dialogbox.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { screenDialogFields } from './screen-dialogbox.field';
import { mScreen } from '../../../../shared/model/screen.model';

@Component({
  selector: 'Screen-DialogboxComponent',
  templateUrl: './screen-dialogbox.component.html',
  styleUrl: './screen-dialogbox.component.scss',
})
export class ScreenDialogboxComponent implements OnInit {

  formFields: DialogField[] = screenDialogFields;
  screen!: mScreen;
  formGroup!: FormGroup;

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
  ) 
  {
    this.formGroup = this.fb.group({})
    this.screen = this.data.data;
  } 

  ngOnInit(): void {
    this.formFields.forEach(field => {
      this.formGroup.addControl(field.name, this.fb.control(this.screen[field.name as keyof mScreen] ?? '', field.required ? Validators.required : null))
    });
  }

  cancel(): void {
    this.dialogRef.close(); 
  }

  save(): void {
    this.dialogRef.close(this.screen);
  }
}
