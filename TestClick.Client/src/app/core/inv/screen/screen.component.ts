import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScreenService } from '../../service/screen.service';
import { selParamModel } from '../../../shared/model/param.model';
import { mScreen, mScreenFilter } from '../../../shared/model/screen.model';
import { gridResponse, responseModel } from '../../../shared/model/response.model';
import { responseStatuEnum } from '../../../shared/model/enum';
import { Subject, takeUntil } from 'rxjs';
import { gridConfig } from '../../../shared/component/grid-config/grid-config.model';
import { screenColumns } from './screen.column';

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

  constructor(private _ss: ScreenService) 
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

  selectedRow(event: any) {
    console.log(event);
  }

  ngOnDestroy(): void {
    this.__unSubscribeAll.next(null);
    this.__unSubscribeAll.complete();
  }
}
