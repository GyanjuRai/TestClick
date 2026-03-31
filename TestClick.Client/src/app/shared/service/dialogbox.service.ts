import { ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, Inject, Injectable, Injector, Type } from "@angular/core";
import { Overlay } from '@angular/cdk/overlay';
import { filter } from "rxjs";
import { ComponentPortal } from "@angular/cdk/portal";
import { DialogConfig } from "../model/dialogbox.model";
import { DIALOG_CONFIG, DIALOG_DATA, DialogRef } from "../component/dailogbox/dialogboxRef";
import { DialogboxComponent } from "../component/dailogbox/dialogbox.component";

@Injectable({
    providedIn: 'root'
})
export class DialogboxService {

    constructor(
        private overlay: Overlay,
        private environmentInjector: EnvironmentInjector,
        private injector: Injector
    )
    {}

    /**
     * Opens a dynamic dialog and injects data into its context.
     * 
     * @param component Component class to render inside the dialog. 
     * @param data The model/fields to display.
     * @returns DialogRef to track the lifecycle and result of the dialog.
     */
    open<T>(component: Type<T>, config?: DialogConfig): DialogRef {
        
        const overlayRef = this.overlay.create({
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-dark-backdrop',
            panelClass: 'cdk-overlay-pane',
            disposeOnNavigation: true
        });
        const dialogRef = new DialogRef<T>(overlayRef);

        /**
         * Child injector that knows about DIALOG_DATA, DIALOG_CONFIG and DialogRef.
         * When angular intialize the compoenent, it walks up this injector tree
         * and finds these two values.  
         */
        const injector = Injector.create(
            {
                providers: [
                    {provide: DIALOG_DATA, useValue: config?.data ?? null },
                    {provide: DIALOG_CONFIG, useValue: config ?? null},
                    {provide: DialogRef, useValue: dialogRef}
                ],
                parent: this.injector
            }
        );
        
        /**
         * Attach the DialogboxComponent to the overlay.
         * This component is responsible for rendering the dialog and hosting the dynamic component inside it.
         */
        const containerPortal = new ComponentPortal(DialogboxComponent, null, injector);
        const containerRef = overlayRef.attach(containerPortal);

        const contnetRef = createComponent(component, {
                environmentInjector: this.environmentInjector,
                elementInjector: injector
        });

        containerRef.instance.attachComponent(contnetRef);

        /**
        * Close the dialog when backdrop is clicked or when 'ESC' key is pressed.
        * This is only done when disableClose is false.
        */
        if(!config?.disableClose) {
            overlayRef.backdropClick().subscribe(() => dialogRef.close());
            overlayRef.keydownEvents()
            .pipe(filter(e => e.key === 'Escape'))
            .subscribe(() => dialogRef.close());
        }

        /**
         * When the dialog is closed.
         * It disposes the overlay and all the components inside it.
         */
        dialogRef.afterClosed().subscribe(() => {
            overlayRef.dispose();
        });

        return dialogRef;
    }
}