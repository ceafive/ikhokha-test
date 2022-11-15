const Queries = ["SHORTER_THAN", "MENTIONS"] as const;

export type TFileData = string[];
export type TQUERIES = typeof Queries[number];

export interface IComparators {
  SHORTER_THAN: number;
  MENTIONS: RegExp;
}

const queryFns = {
  SHORTER_THAN: (data: TFileData, comparator: IComparators["SHORTER_THAN"]) =>
    data.filter((string) => string?.length <= comparator)?.length,
  MENTIONS: (data: TFileData, regex: IComparators["MENTIONS"]) =>
    data.filter((string) => regex.test(string))?.length,
};

const runErrors = {
  noDataError: (data: TFileData) => {
    if (!Array.isArray(data) || !data?.length) {
      throw Error("Non empty data array required");
    }
  },

  noQueryError: (query: TQUERIES) => {
    if (!query || !Queries.includes(query)) {
      throw Error("Query is not valid");
    }
  },
};

const runAnalytics = (data: TFileData) => {
  runErrors.noDataError(data);
  return <T extends TQUERIES>(param: T) => {
    runErrors.noQueryError(param);
    return (comparator: IComparators[typeof param]) => {
      return queryFns[param](data, <number & RegExp>comparator);
    };
  };
};

export default {
  runAnalytics,
} as const;
