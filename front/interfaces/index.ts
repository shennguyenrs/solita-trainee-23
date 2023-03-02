// Stations
export interface STATION_INFO {
  id: number;
  name: string;
  address: string;
  capacities: number;
  x: number;
  y: number;
}

export type STATION_NAME = Pick<STATION_INFO, 'id' | 'name'>;

export enum STATIONS_FIELDS {
  ID = 'id',
  NAME = 'name',
  ADDRES = 'address',
  CAPACITIES = 'capacities',
  X = 'x',
  Y = 'y',
}

export interface TOP_STATIONS {
  returnStationId?: number;
  departureStationId?: number;
  name: string;
  total: number;
}

export interface SINGLE_STATION_STAT {
  info: STATION_INFO;
  topStationsStartingFrom: TOP_STATIONS[];
  topStationsEndingAt: TOP_STATIONS[];
  avgDistancesStartingFrom: number;
  avgDistancesEndingAt: number;
}

// Journies
export interface JOURNIES_INFO {
  id: number;
  departure: string;
  return: string;
  departureStationId: number;
  returnStationId: number;
  departureStationName: string;
  returnStationName: string;
  coveredDistance: number;
  duration: number;
}

// Pagination
interface PAGINATION_STAT {
  allPages: number;
  currentPage: number;
  show: number;
}

export interface PAGINATION_STATIONS {
  data: STATION_INFO[];
  pagination: PAGINATION_STAT;
}

export enum SORT_BY {
  ASC = 'asc',
  DESC = 'desc',
}

export interface DATA_FIELD {
  label: string;
  value: string;
  isNumberic: boolean;
}
