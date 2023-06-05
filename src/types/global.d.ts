export {};

declare global {
  interface IData {
    host: string,
    datetime: {
      day: number,
      hour: number,
      minute: number,
      second: number
    },
    request: {
      method: string,
      url:string,
      protocol: string,
      protocol_version: string
    },
    response_code: number,
    document_size: number
  }[]
  interface IGetLocalData {
    fileName: string;
  }
  interface IParseDate {
    date: string;
  }
  interface IParseRequest {
    method: string;
    url: string;
    protocol: string;
  }
  interface IProcessLine {
    line: string;
  }
  interface IProcessData {
    data: string;
  }
  //Responses
  interface IProcessLineResponse {
    host: string | null;
    datetime: IParseDateResponse;
    request: IParseRequestResponse;
    response_code: number | string;
    document_size: number;
  }
  interface IParseRequestResponse {
    method: string | null;
    url: string | null;
    protocol: string | null;
    protocol_version: string | null;
  }
  interface IParseDateResponse {
    day: number | null;
    hour: number | null;
    minute: number | null;
    second: number | null;
  }
}
