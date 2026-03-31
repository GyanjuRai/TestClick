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
    type: 'text' | 'number';
    columnName: string;
    width?: string;
}

/**
 * Configures the grid
 * 
 * @columns List of gridColumn
 * @Data Object with data (any[]) and totalRows
 */
export interface gridConfig {
    columns: gridColumn[];
    dataSource: {
        data: any[],
        totalRows: number
    }
}