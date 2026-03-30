import { InjectionToken } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { DialogConfig } from "./dialogbox.model";
import { OverlayRef } from "@angular/cdk/overlay";

/** unique key for injecting data into dialog. */
export const DIALOG_DATA = new InjectionToken<DialogConfig>('dialog.data');
/**  unique key for injecting dialog config. */
export const DIALOG_CONFIG = new InjectionToken<DialogConfig>('dialog.config'); 

export class DialogRef<T = any> {
    
    /** Subject for notifying the user that the dialog has finished opening. */
    private readonly _afterClose = new Subject<T | undefined>();
    /** Subject for notifying the user that the dialog has started closing. */
    private readonly _beforeClose = new Subject<T | undefined>();

    constructor(private _overlayRef: OverlayRef) {}
    /**
     * 
     * @returns Observable. Caller can subscribe but cannnot emit
     */
    afterClosed(): Observable<T | undefined> {
        return this._afterClose.asObservable();
    }

    /**
     * Single exit point. Service call this after it's done cleanup.
     * Component also calls this directly at save button.
     * 
     * @param result Data from the dialog box
     */
    close(result?: T): void {
        this._afterClose.next(result);
        this._afterClose.complete();
    }
}