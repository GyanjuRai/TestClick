import { DialogField } from '../../../../shared/component/dailogbox/dialogbox.model';

export const screenDialogFields: DialogField[] = [
  {
    label: 'Screen Name',
    name: 'screenName',
    type: 'text',
    required: true,
  },
  {
    label: 'Specification',
    name: 'specification',
    type: 'textarea',
    required: true,
  },
  {
    label: 'Country',
    name: 'country',
    type: 'text',
    required: true,
  },
  {
    label: 'City',
    name: 'city',
    type: 'text',
    required: true,
  },
  {
    label: 'Placement Type',
    name: 'placementType',
    type: 'select',
    options: [
      { label: 'Indoor', value: 1 },
      { label: 'Outdoor', value: 2 },
    ],
  },
  {
    label: 'Placement',
    name: 'placement',
    type: 'text',
    required: true,
  },
  {
    label: 'basePrice',
    name: 'basePrice',
    type: 'number',
    required: true,
  },
  {
    label: 'Impressions',
    name: 'avgViewer',
    type: 'number',
    required: true,
  },
  {
    label: 'Status',
    name: 'status',
    type: 'select',
    options: [
      { label: 'Active', value: 1 },
      { label: 'Inactive', value: 2 },
    ],
  },
  {
    label: 'Type',
    name: 'type',
    type: 'select',
    options: [
      { label: 'Analog', value: 1 },
      { label: 'Digital', value: 2 },
    ],
  },
];
