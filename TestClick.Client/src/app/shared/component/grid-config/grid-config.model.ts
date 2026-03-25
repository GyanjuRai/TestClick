/**
 * GridColumn interface defines the table headers.
 * 
 * @name Property for matching the model key 
 * @type Property HTML tag type
 * @columnName Column name to display
 * @width Optional - Width of the header 
 */
export interface gridColumn {
    name: string;
    type: string;
    columnName: string;
    width?: string;
}

/**
 * Configures the grid
 * 
 */
export interface gridConfig {
    columns: gridColumn[];
    data: {
        data: any[],
        totalRows: number
    },
    rowActionButtons: boolean
}