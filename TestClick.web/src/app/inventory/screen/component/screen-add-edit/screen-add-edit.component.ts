import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  enumToOptions,
  responseStatusEnum,
  screenPlacementTypeEnum,
  screenStatusEnum,
  screenTypeEnum,
} from '../../../../shared';
import { mScreen, mScreenIns, mScreenUpd } from '../../model/screen.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScreenService } from '../../service/screen.service';
import { responseModel } from '../../../../shared/model/response.model';
import { AppComponent } from '../../../../app.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'screen-add-edit',
  templateUrl: './screen-add-edit.component.html',
  styleUrl: './screen-add-edit.component.scss',
})
export class ScreenAddEditComponent
  extends AppComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() screen: mScreen = {} as mScreen;
  @Output() afterFormClosed = new EventEmitter<mScreen | null>();
  protected formGroup!: FormGroup;
  protected formOpen = false;

  private __unSubscribeAll$ = new Subject<any>();
  protected placementTypeOptions = enumToOptions(screenPlacementTypeEnum);
  protected screenTypeOptions = enumToOptions(screenTypeEnum);
  protected statusTypeOtpions = enumToOptions(screenStatusEnum);

  constructor(
    private fb: FormBuilder,
    private _screenService: ScreenService,
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
  }

  protected initForm() {
    this.formGroup = this.fb.group({
      screenName: [this.screen.screenName, Validators.required],
      specification: [this.screen.specification, Validators.required],
      country: [this.screen.country],
      city: [this.screen.city],
      placementType: [this.screen.placementType, Validators.required],
      status: [this.screen.status, Validators.required],
      type: [this.screen.type, Validators.required],
      basePrice: [
        this.screen.basePrice,
        [Validators.required, Validators.min(1)],
      ],
      avgViewer: [
        this.screen.avgViewer,
        [Validators.required, Validators.min(1)],
      ],
      placement: [this.screen.placement, Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['screen'] && this.formGroup) {
      this.formGroup.reset(this.screen);
    }
  }

  /**
   * Used by parent using Template reference variable.
   * To open the screen.
   */
  public open() {
    this.formOpen = true;
  }

  protected get dialogHeader(): string {
    return this.screen?.id ? 'Edit Screen' : 'Add Screen';
  }

  protected get btnLabel(): string {
    return this.screen?.id ? 'Edit' : 'Add';
  }

  protected _afterClosed(action: string) {
    if (action === 'close') {
      this.screen = {} as mScreen;
      this.close(null);
      return;
    }

    if (this.formGroup.dirty) {
      if (this.formGroup.valid) {
        if (action === 'Add') {
          const screenAddParam = {
            tenantId: 10,
            ...this.formGroup.value,
            createdBy: 10,
          } as mScreenIns;

          this._screenService
            .addScreen(screenAddParam)
            .pipe(takeUntil(this.__unSubscribeAll$))
            .subscribe({
              next: (response: responseModel<mScreen[]>) => {
                if (
                  response.type === responseStatusEnum.success &&
                  response.data.length > 0
                ) {
                  this._messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Screen ${response.data[0].screenName} Added`,
                  });
                  this.close(response.data[0]);
                } else {
                  this._messageService.add({
                    severity: 'error',
                    summary: 'Failed',
                    detail: `Failed to add ${screenAddParam.screenName}. ${response.message} `,
                  });
                  this.afterFormClosed.emit(null);
                  return;
                }
              },
              error: () => {
                this._messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: `Failted to Add.
                          Server error.`,
                });
                this.afterFormClosed.emit(null);
                return;
              },
            });
        } else {
          const screenEditParam = {
            id: this.screen.id,
            ...this.formGroup.value,
            updatedBy: this.screen.createdBy, // For dev only. I don't want to have another tenant user updating the screen by hard coding.
          } as mScreenUpd;

          this._screenService
            .editScreen(screenEditParam)
            .pipe(takeUntil(this.__unSubscribeAll$))
            .subscribe({
              next: (response: responseModel<mScreen[]>) => {
                if (response.type === responseStatusEnum.success) {
                  this._messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Screen ${response.data[0].screenName} Edited`,
                  });
                  this.close(response.data[0]);
                } else {
                  this._messageService.add({
                    severity: 'error',
                    summary: 'Failed',
                    detail: `Failed to add ${screenEditParam.screenName}. ${response.message} `,
                  });
                  this.afterFormClosed.emit(null);
                  return;
                }
              },
              error: (ex: any) => {
                this._messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: `Failted to eidt.
                          Server error.`,
                });
                this.close(null);
              },
            });
        }
      } else {
        this._messageService.add({
          severity: 'info',
          summary: 'Info',
          detail: `Please enter the correct value.`,
        });
        return;
      }
    } else {
      this._messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: `Please modify the form values before ${this.btnLabel}ing.`,
      });
      return;
    }
  }

  /**
   * Closes the form.
   * @param screen The edit and add screen object from API response.
   */
  private close(screen: mScreen | null) {
    this.screen = {} as mScreen;
    this.afterFormClosed.emit(screen);
    this.formOpen = false;
  }

  ngOnDestroy(): void {
    this.__unSubscribeAll$.next(null);
    this.__unSubscribeAll$.complete();
  }
}
