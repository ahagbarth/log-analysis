export const calculateRequestsPerMinute = (data: IData) =>
  data.reduce(
    (
      accumulator: number[],
      current: { datetime: { minute: number; hour: number } }
    ) =>
      accumulator[current.datetime.minute * current.datetime.hour]
        ? {
            ...accumulator,
            [current.datetime.minute * current.datetime.hour]:
              accumulator[current.datetime.minute * current.datetime.hour] + 1,
          }
        : {
            ...accumulator,
            [current.datetime.minute * current.datetime.hour]: 1,
          },
    {}
  );

export const calculateHttpMethods = (data: IData) => {
  return data.reduce(
    (
      accumulator: { [x: string]: number },
      current: { request: { method: string } }
    ) =>
      accumulator[current.request.method]
        ? {
            ...accumulator,
            [current.request.method]: accumulator[current.request.method] + 1,
          }
        : { ...accumulator, [current.request.method]: 1 },
    {}
  );
};

export const calculateHttpCodes = (data: IData) =>
  data.reduce(
    (
      accumulator: { [x: string]: number },
      current: { response_code: number }
    ) =>
      accumulator[current.response_code]
        ? {
            ...accumulator,
            [current.response_code]: accumulator[current.response_code] + 1,
          }
        : { ...accumulator, [current.response_code]: 1 },
    {}
  );

export const calculateResponseSizes = (data: IData) => {
  return data.reduce(
    (
      accumulator: { [x: string]: number },
      current: { response_code: number; document_size: number }
    ) => {
      if (current.response_code == 200 && current.document_size < 1000) {
        return accumulator[current.document_size]
          ? {
              ...accumulator,
              [current.document_size]: accumulator[current.document_size] + 1,
            }
          : { ...accumulator, [current.document_size]: 1 };
      } else {
        return accumulator;
      }
    },
    {}
  );
};
