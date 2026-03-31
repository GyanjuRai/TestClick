/**
 * Configuration for opening a modal dialog with Dialogbox service
 */
export class DialogConfig<T = any> {
    /** Whether the user can use escape or clicking on the backdrop to close the modal. */
    disableClose?: boolean;
    /** Width of the dialog */
    width?: string;
    /** Height of the dialog */
    heigth?: string;
    /** Data being injected into the child component */
    data?: T | null;
}

/**
 * Field types for form
 */
export type DialogFieldType = 'text' | 'number' | 'select' | 'datetime' | 'textarea';

/**
 * Option for dropdown/select
 */
export interface DialogOption {
    /** Select display. eg: name */
    label: string;
    /** Actual value. eg: id */
    value: any;
}

/**
 * Configuration for each field in the form
 */
export interface DialogField {
    /**
     * Label for the form field.
     */
    label: string;
    /**
     * Name of the form field.
     * Key to bind the form control and DialogData.data property.
     */
    name: string;
    /**
     * Type of the form field.
     */
    type: DialogFieldType;
    /**
     * Optional. Options for dropdown/select field type.
     */
    options?: DialogOption[];
    /**
     * Optional. Required or not.
     */
    required?: boolean;
}

/**
 * Configuration for dialog data
 */
export interface DialogData {
    /** 
     * Dialog title
    */
    title: string;
    /**
     * Data to be edited or added in the form.
     * It can be used to pre-populate the form when editing an existing item.
     */
    data?: any;
    /**
     * Optional. Submit button label.
     */
    submitLable?: string;
    /** 
     * Optional. Cancel button label.
    */
    cancelLabel?: string;
} 