
export const limits = {
  FIRST_HOME: 75,
  UPGRADER: 70,
  PURPOSE: 50,
};

export const initialTracks = [
  {
    id: "prime",
    name: "פריים",
    type: "PRIME",
    amount: 0,
    rate: 5,
    years: 30,
  },
  {
    id: "fixed",
    name: "קל״צ",
    type: "FIXED",
    amount: 0,
    rate: 4.5,
    years: 25,
  },
  {
    id: "fixedIndexed",
    name: "קבועה צמודה",
    type: "FIXED",
    amount: 0,
    rate: 3.5,
    years: 25,
  },
  {
    id: "variable5",
    name: "משתנה כל 5",
    type: "VARIABLE",
    amount: 0,
    rate: 4,
    years: 30,
  },
  {
    id: "variableIndexed",
    name: "משתנה צמודה",
    type: "VARIABLE",
    amount: 0,
    rate: 3.8,
    years: 30,
  },
];

export const MAX_AGE_AT_END = 80;
export const MAX_LOAN_YEARS = 30;
