import {
  Component,
  Inject,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { mScreen, mScreenDel } from '../../model/screen.model';
import {
  gridResponse,
  responseModel,
} from '../../../../shared/model/response.model';
import { responseStatusEnum } from '../../../../shared/model/enum';
import { finalize, Subject, takeUntil } from 'rxjs';
import { screenColumns } from '../../model/screen-list.column';
import { AppComponent } from '../../../../app.component';
import { ScreenService } from '../../service/screen.service';
import { ScreenAddEditComponent } from '../screen-add-edit/screen-add-edit.component';
import { ScreenDetailComponent } from '../screen-detail/screen-detail.component';
import { ConfirmationOptions } from '../../../../core/model/confirmation.model';

@Component({
  selector: 'screen-list',
  templateUrl: './screen-list.component.html',
  styleUrl: './screen-list.component.scss',
})
export class ScreenListComponent
  extends AppComponent
  implements OnInit, OnDestroy
{
  @ViewChild('screenAddEdit')
  screenAddEditForm!: ScreenAddEditComponent;
  @ViewChild('screenDetail')
  screenDetail!: ScreenDetailComponent;

  private __unSubscribeAll$: Subject<any>;

  protected columns = screenColumns;
  protected screens: mScreen[] = [];
  protected selectedScreen: mScreen = {} as mScreen;
  protected isLoading = false;
  protected first = 0;
  protected rows = 10;

  constructor(
    private _screenService: ScreenService,
    injector: Injector,
  ) {
    super(injector);
    this.__unSubscribeAll$ = new Subject();
  }

  ngOnInit(): void {
    this.loadScreens();
  }

  protected loadScreens() {
    const param = {
      offset: 0,
      pageSize: 58,
    };
    this.isLoading = true;
    this._screenService
      .getScreen(param)
      .pipe(
        takeUntil(this.__unSubscribeAll$),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe((response: responseModel<gridResponse<mScreen>>) => {
        if (
          response.type === responseStatusEnum.success &&
          response.data.data
        ) {
          this.screens = [...response.data.data];
          this.isLoading = false;
        }
      });
  }

  protected openForm(screen?: mScreen) {
    if (screen) {
      this.selectedScreen = { ...screen };
    }

    this.screenAddEditForm.open();
  }

  afterFormClosed(screen: mScreen | null) {
    if (screen !== null) {
      const index = this.screens.findIndex((s) => s.id === screen.id);
      if (index > -1) {
        this.screens[index] = screen;
        this.screens = [...this.screens];
      } else {
        this.screens = [
          ...this.screens.slice(0, this.first),
          screen,
          ...this.screens.splice(this.first),
        ];
      }
    }
    this.selectedScreen = {} as mScreen;
  }

  protected openDetailView(screen: mScreen) {
    this.selectedScreen = { ...screen };
    this.screenDetail.open();
  }

  afterViewDetailClose() {
    this.selectedScreen = {} as mScreen;
  }

  onDelete(screen: mScreen): void {
    const confirmDialogOptions = {
      message: `Are you sure you want to delete <b>${screen.screenName}</b>?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      onAccept: () => {
        const deleteParam = {
          id: screen.id,
          updatedBy: screen.updatedBy,
        } as mScreenDel;
        this._screenService
          .deleteScreen(deleteParam)
          .pipe(takeUntil(this.__unSubscribeAll$))
          .subscribe({
            next: (response: responseModel<mScreen>) => {
              if (
                response.type === responseStatusEnum.success &&
                response.data
              ) {
                const index = this.screens.findIndex((s) => s.id === screen.id);
                this.screens.splice(index, 1);
                this.screens = [...this.screens];
                this.showToast(
                  'info',
                  'Deleted',
                  `Screen ${screen.screenName} is deleted.`,
                );
              }
            },
            error: () => {
              this.showToast(
                'error',
                'Failed',
                `Failed to delete ${screen.screenName}.`,
              );
            },
          });
      },
    } as ConfirmationOptions;

    this.openConfirmationBox(confirmDialogOptions);
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  ngOnDestroy(): void {
    this.__unSubscribeAll$.next(null);
    this.__unSubscribeAll$.complete();
  }
}
