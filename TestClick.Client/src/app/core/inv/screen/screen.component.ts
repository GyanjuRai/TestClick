import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScreenService } from '../../service/screen.service';
import { selParamModel } from '../../../shared/model/param.model';
import { mScreen, mScreenFilter } from '../../../shared/model/screen.model';
import { gridResponse, responseModel } from '../../../shared/model/response.model';
import { responseStatuEnum } from '../../../shared/model/enum';
import { Subject, takeUntil } from 'rxjs';
import { gridConfig } from '../../../shared/component/grid-config/grid-config.model';
import { DialogboxService } from '../../../shared/component/dailogbox/dialogbox.service';
import { ScreenDialogboxComponent } from './screen-dialogbox/screen-dialogbox.component';
import { screenColumns } from './screen.column';
import { DialogData } from '../../../shared/component/dailogbox/dialogbox.model';

@Component({
  selector: 'ScreenComponent',
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.scss'
})
export class ScreenComponent implements OnInit, OnDestroy {

  private __unSubscribeAll: Subject<any>;
  gridConfig: gridConfig = {
    columns: screenColumns,
    dataSource: {
      data : [],
      totalRows: 0
    }
  }
  screens: mScreen[] = [];
  selectedScreen: mScreen = {} as mScreen;

  constructor(
    private _ss: ScreenService,
    private dialog: DialogboxService
  ) 
  {
    this.__unSubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.getScreen();
  }

  getScreen() {

    let param : selParamModel<mScreenFilter> = {
      offset: 0,
      pageSize: 10,
    };

    this._ss.getScreen(param)
    .pipe(takeUntil(this.__unSubscribeAll))
    .subscribe((response: responseModel<gridResponse<mScreen>>) => {
      if(response.type === responseStatuEnum.success && response.data) {
        this.gridConfig.dataSource.data = response.data.data ?? [];

        this.gridConfig = {...this.gridConfig}; // Refresh the grid. Implemented ngOnChanges
      }
    });
  }

  openDialog(type: string) {

    const dialogData : DialogData = {
      title: type === 'add' ? 'Add Screen' : 'Edit Screen',
      data: this.selectedScreen,
      submitLable: type === 'add' ? 'Add' : 'Save',
      cancelLabel: 'Cancel'
    } 

    const dialogRef = this.dialog.open(ScreenDialogboxComponent, {
      disableClose: false,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
    });
  }

  selectedRow(event: any) {
    console.log(event);
  }

  ngOnDestroy(): void {
    this.__unSubscribeAll.next(null);
    this.__unSubscribeAll.complete();
  }
}
