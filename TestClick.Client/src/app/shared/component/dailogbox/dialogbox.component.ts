import { 
  ChangeDetectionStrategy, 
  Component, ComponentRef, Inject, ViewChild, 
  ViewContainerRef 
} from '@angular/core';
import { DIALOG_CONFIG } from './dialogboxRef';
import { DialogConfig } from './dialogbox.model';

@Component({
  template: `
    <div class="dialog-box">
        <ng-template #host></ng-template>
    </div>
  `,
  styleUrl: './dialogbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

/**
 * DialogboxComponent is a wrapper component that serves as the container for the dynamic component rendered inside the dialog.
 * It is responsible for rendering the dialog structure and hosting the dynamic component inside it.
 * The DialogboxService creates an instance of this component and attaches the dynamic component to its view container.
 */
export class DialogboxComponent {

  @ViewChild('host', { read: ViewContainerRef, static: true})
  host!: ViewContainerRef;

  constructor(@Inject(DIALOG_CONFIG) public config: DialogConfig) {}

  /**
   * Method to attach the dynamic component to the dialog's view container.
   * 
   * @param component Reference to the dynamically created component that should be rendered inside the dialog.
   */
  attachComponent<T>(component: ComponentRef<T>) {
    this.host.insert(component.hostView);
  }
}
