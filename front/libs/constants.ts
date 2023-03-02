import { DATA_FIELD, SORT_BY } from '../interfaces';

export const initialPagiPara = {
  currentPage: 1,
  show: 10,
  order: 'id',
  sort: SORT_BY.ASC,
};

export const journiesFields: DATA_FIELD[] = [
  { label: 'id', value: 'id', isNumberic: true },
  {
    label: 'departure',
    value: 'departure',
    isNumberic: false,
  },
  {
    label: 'depature station',
    value: 'departure_station_name',
    isNumberic: false,
  },
  {
    label: 'return',
    value: 'return',
    isNumberic: false,
  },
  {
    label: 'return station',
    value: 'return_station_name',
    isNumberic: false,
  },
  {
    label: 'covered distance (m)',
    value: 'covered_distance',
    isNumberic: true,
  },
  {
    label: 'duration (sec.)',
    value: 'duration',
    isNumberic: true,
  },
];

export const stationsFields: DATA_FIELD[] = [
  { label: 'id', value: 'id', isNumberic: true },
  {
    label: 'name',
    value: 'name',
    isNumberic: false,
  },
  {
    label: 'address',
    value: 'address',
    isNumberic: false,
  },
  {
    label: 'capacities',
    value: 'capacities',
    isNumberic: true,
  },
  {
    label: 'x',
    value: 'x',
    isNumberic: true,
  },
  {
    label: 'y',
    value: 'y',
    isNumberic: true,
  },
];
