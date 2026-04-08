import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  mScreen,
} from '../../model/screen.model';
import {
  gridResponse,
  responseModel,
} from '../../../../shared/model/response.model';
import { responseStatuEnum } from '../../../../shared/model/enum';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ScreenBaseComponent } from '../screen-base.component';
import { screenColumns } from '../../model/screen-list.column';
import { ScreenAddEditComponent } from '../screen-add-edit/screen-add-edit.component';

@Component({
  selector: 'screen-list',
  templateUrl: './screen-list.component.html',
  styleUrl: './screen-list.component.scss',
})
export class ScreenListComponent
  extends ScreenBaseComponent
  implements OnInit, OnDestroy
{
  @ViewChild('screenAddEdit') screenAddEdit!: ScreenAddEditComponent;
  private __unSubscribeAll$: Subject<any>;

  columns = screenColumns;
  screens: mScreen[] = [];
  selectedScreen: mScreen = {} as mScreen;
  isLoading = false;
  first = 0;
  rows = 10;

  constructor() {
    super();
    this.__unSubscribeAll$ = new Subject();
  }

  ngOnInit(): void {
    this.loadScreens();
  }

  loadScreens() {
    const param = {
      offset: 0,
      pageSize: 53,
    };
    this.isLoading = true;
    this._screenService
      .getScreen(param)
      .pipe(
        takeUntil(this.__unSubscribeAll$),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe((response: responseModel<gridResponse<mScreen>>) => {
        if (response.type === responseStatuEnum.success && response.data.data) {
          this.screens = [...response.data.data];
          this.isLoading = false;
        }
      });
  }

  onAdd(): void {
    this.screenAddEdit.screenData = {} as mScreen;
    this.screenAddEdit.open();
  }

  onEdit(screen: mScreen): void {
    this.screenAddEdit.screenData = { ...screen };
    this.screenAddEdit.open();
  }

  onView(screen: mScreen): void {
    this.screenAddEdit.screenData = { ...screen };
    this.screenAddEdit.openViewMode();
  }

  onDelete(screen: mScreen): void {
    this._confirmationService.confirm({
      message: `Are you sure you want to delete <b>${screen.screenName}</b>?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.showToast('info', 'Info', 'Screen deleted !');
      },
    });
  }

  onScreenSaved(action: string): void {
    if (action === 'Add') {
      this.screenAddEdit.screenData;
      //Success API response
      this.showToast('success', 'Created', 'Screen created successfully.');
      this.screenAddEdit.close();
      this.selectedScreen = {} as mScreen;
    } else {
      this.showToast('success', 'Updated', 'Screen updated successfully.');
      this.screenAddEdit.close();
      this.selectedScreen = {} as mScreen;
    }
  }

  onScreenCancelled(): void {
    this.screenAddEdit.screenData = {} as mScreen;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  private showToast(severity: string, summary: string, detail: string): void {
    this._messageService.add({ severity, summary, detail, life: 3000 });
  }

  // toggle() {
  //   this.something = !this.something;
  // }

  ngOnDestroy(): void {
    this.__unSubscribeAll$.next(null);
    this.__unSubscribeAll$.complete();
  }
}
