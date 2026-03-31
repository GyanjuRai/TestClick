import { gridColumn } from "../../../../shared/model/grid-config.model";

export const screenColumns: gridColumn[] = [
    {
        name: 'screenName',
        columnName: 'Screens',
        type: 'text'
    },
    {
        name: 'specification',
        columnName: 'Specification',
        type: 'text'
    },
    {
        name: 'country',
        columnName: 'Country',
        type: 'text'
    },
    {
        name: 'city',
        columnName: 'City',
        type: 'text'
    },
    {
        name: 'placement',
        columnName: 'Placement',
        type: 'number'
    },
    {
        name: 'avgViewer',
        columnName: 'Impression',
        type: 'text'
    },
    {
        name: 'basePrice',
        columnName: 'Price',
        type: 'number'
    }
];