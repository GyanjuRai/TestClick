import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScreenService } from '../../service/screen.service';
import { selParamModel } from '../../../../shared/model/param.model';
import {
  mScreen,
  mScreenDel,
  mScreenFilter,
  mScreenIns,
  mScreenUpd,
} from '../../model/screen.model';
import {
  gridResponse,
  responseModel,
} from '../../../../shared/model/response.model';
import { responseStatuEnum } from '../../../../shared/model/enum';
import { Subject, takeUntil } from 'rxjs';
import { gridConfig } from '../../../../shared/model/grid-config.model';
import { ScreenDialogboxComponent } from '../screen-dialogbox/screen-dialogbox.component';
import { screenColumns } from './screen-list.column';
import { DialogData } from '../../../../shared/model/dialogbox.model';
import { faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {
  ConfirmationData,
  ScreenConfirmationboxComponent,
} from '../screen-confirmationbox/screen-confirmationbox.component';
import { DialogboxService } from '../../../../shared/service/dialogbox.service';

@Component({
  selector: 'ScreenComponent',
  templateUrl: './screen-list.component.html',
  styleUrl: './screen-list.component.scss',
})
export class ScreenListComponent implements OnInit, OnDestroy {
  private __unSubscribeAll: Subject<any>;
  private isDialogOpen: boolean = false;
  private isConfirmationBoxOpen: boolean = false;
  screenConfig: gridConfig = {
    columns: screenColumns,
    dataSource: {
      data: [],
      totalRows: 0,
    },
    options: {
      filter: {
        statusIdList: [],
        placementTypeIdList: [],
        typeIdList: []
      },
      offset: 0,
      pageSize: 10,
      sortBy: 'screenName',
      sortOrder: 'asc'
    }
  };
  screens: mScreen[] = [];
  selectedScreen: mScreen = {} as mScreen;

  faPlusCircle = faPlusCircle as any;
  faTrash = faTrash as any;

  constructor(
    private _ss: ScreenService,
    private dialog: DialogboxService,
  ) {
    this.__unSubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.getScreen();
  }

  getScreen() {
    
    this._ss
      .getScreen(this.screenConfig.options)
      .pipe(takeUntil(this.__unSubscribeAll))
      .subscribe((response: responseModel<gridResponse<mScreen>>) => {
        if (response.type === responseStatuEnum.success && response.data) {
          this.screenConfig.dataSource.data = response.data.data ?? [];
          this.screenConfig.dataSource.totalRows = response.data.totalCount ?? 0;

          this.screenConfig = { ...this.screenConfig }; // Refresh the grid.
        } else {
          this.screenConfig = { ...this.screenConfig }; // Refresh the grid.
        }
      });
  }

  openDialog(type: string) {
    if (this.isDialogOpen) return;
    this.isDialogOpen = true;

    const dialogData: DialogData = {
      title: type === 'add' ? 'Add Screen' : 'Edit Screen',
      data: this.selectedScreen,
      submitLable: type === 'add' ? 'Add' : 'Update',
      cancelLabel: 'Cancel',
    };

    const dialogRef = this.dialog.open(ScreenDialogboxComponent, {
      disableClose: true,
      data: dialogData,
    });

    if (type === 'add') {
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const param = {
            tenantId: 10, // Replace with actual tenant ID from session or auth service
            ...result,
            createdBy: 10, // Replace with actual user ID from session or auth service
          } as mScreenIns;

          this._ss
            .postScreen(param)
            .pipe(takeUntil(this.__unSubscribeAll))
            .subscribe((response: responseModel<mScreen[]>) => {
              if (response.type === responseStatuEnum.success) {
                this.screenConfig.dataSource.data = [
                  ...(response.data ?? []),
                  ...(this.screenConfig.dataSource.data ?? []),
                ];
              }
            });
        }
        this.selectedScreen = {} as mScreen;
        this.isDialogOpen = false;
      });
    } else {
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const param = {
            id: this.selectedScreen.id,
            ...result,
            updatedBy: 10, // Replace with actual user ID from session or auth service
          } as mScreenUpd;

          this._ss
            .putScreen(param)
            .pipe(takeUntil(this.__unSubscribeAll))
            .subscribe((response: responseModel<mScreen[]>) => {
              if (
                response.type === responseStatuEnum.success &&
                response.data
              ) {
                const updatedScreen = response.data[0];
                this.screenConfig.dataSource.data =
                  this.screenConfig.dataSource.data?.map((screen) =>
                    screen.id === updatedScreen.id ? updatedScreen : screen,
                  ) ?? [];

                this.screenConfig = { ...this.screenConfig }; // Refresh the grid.
              }
            });
        }
        this.selectedScreen = {} as mScreen;
        this.isDialogOpen = false;
      });
    }
  }

  openConfirmationBox(id: any) {
    if (this.isConfirmationBoxOpen) return;
    this.isConfirmationBoxOpen = true;
    const dialogData = {
      title: 'Delete Confirmation',
      message: 'Are you sure you want to delete this screen?',
      confirmLabel: 'Delete',
      cancelLabel: 'Cancel',
    } as ConfirmationData;

    const dialogRef = this.dialog.open(ScreenConfirmationboxComponent, {
      disableClose: true,
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const param = {
          id: id,
          updatedBy: 10, // Replace with actual user ID from session or auth service
        } as mScreenDel;

        this._ss
          .deleteScreen(param)
          .pipe(takeUntil(this.__unSubscribeAll))
          .subscribe((response: responseModel<mScreen>) => {
            if (response.type === responseStatuEnum.success && response.data) {
              this.screenConfig.dataSource.data =
                this.screenConfig.dataSource.data?.filter(
                  (screen) => screen.id !== response.data.id,
                ) ?? [];
            }
          });
        this.isConfirmationBoxOpen = false;
      }
      this.isConfirmationBoxOpen = false;
    });
  }

  pageChange(offset: number) {
    this.screenConfig.options.offset = offset;
    this.getScreen();
  }

  refresh() {
    this.getScreen();
  }

  rowDblClick(row: any) {
    this.selectedScreen = row;
    this.openDialog('edit');
  }

  rowDltBtnClick(id: any) {
    this.openConfirmationBox(id);
  }

  rowUpdBtnClick(row: any) {
    this.selectedScreen = row;
    this.openDialog('edit');
  }

  ngOnDestroy(): void {
    this.__unSubscribeAll.next(null);
    this.__unSubscribeAll.complete();
  }
}
