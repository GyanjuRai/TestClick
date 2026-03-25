import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScreenService } from '../../service/screen.service';
import { selParamModel } from '../../model/param.model';
import { mScreen, mScreenFilter } from '../../model/screen.model';
import { gridResponse, responseModel } from '../../model/response.model';
import { responseStatuEnum } from '../../model/response.enum';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'ScreenComponent',
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.scss'
})
export class ScreenComponent implements OnInit, OnDestroy {
  private __unSubscribeAll: Subject<any>;
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
        this.screens = response.data.data ?? [];
      }
    });
  }

  ngOnDestroy(): void {
    this.__unSubscribeAll.next(null);
    this.__unSubscribeAll.complete();
  }
}
