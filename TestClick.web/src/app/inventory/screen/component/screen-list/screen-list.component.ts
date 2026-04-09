import {
  Component,
  Inject,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { mScreen } from '../../model/screen.model';
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
        this.screens = [screen, ...this.screens];
      }
    }
    this.selectedScreen = {} as mScreen;
  }

  // TODO: I have to change not here for now.
  onDelete(screen: mScreen): void {
    this._confirmationService.confirm({
      message: `Are you sure you want to delete <b>${screen.screenName}</b>?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {},
    });
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
