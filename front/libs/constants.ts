import { DATA_FIELD, SORT_BY } from "../interfaces";

export const initialPagiPara = {
  currentPage: 1,
  show: 10,
  order: "id",
  sort: SORT_BY.ASC,
};

export const journiesFields: DATA_FIELD[] = [
  { label: "id", isNumberic: true },
  {
    label: "departure",
    isNumberic: false,
  },
  {
    label: "depature station",
    isNumberic: false,
  },
  {
    label: "return",
    isNumberic: false,
  },
  {
    label: "return station",
    isNumberic: false,
  },
  {
    label: "covered distance (m)",
    isNumberic: true,
  },
  {
    label: "duration (sec.)",
    isNumberic: true,
  },
];

export const stationsFields: DATA_FIELD[] = [
  { label: "id", isNumberic: true },
  {
    label: "name",
    isNumberic: false,
  },
  {
    label: "address",
    isNumberic: false,
  },
  {
    label: "capacities",
    isNumberic: true,
  },
  {
    label: "x",
    isNumberic: true,
  },
  {
    label: "y",
    isNumberic: true,
  },
];
