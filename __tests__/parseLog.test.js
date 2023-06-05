import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { parseDate, parseRequest, processData, processLine } from "../src/api/ParseLog.ts";

describe("Parse Log File", () => {
  it("Process Data", () => {
    const data =
      '141.243.1.172 [29:23:53:25] "GET /Software.html HTTP/1.0" 200 1497\nquery2.lycos.cs.cmu.edu [29:23:53:36] "GET /Consumer.html HTTP/1.0" 200 1325';
    const result = [
      {
        datetime: { day: 29, hour: 23, minute: 53, second: 25 },
        document_size: 1497,
        host: "141.243.1.172",
        request: {
          method: "GET",
          protocol: "HTTP",
          protocol_version: "1.0",
          url: "/Software.html",
        },
        response_code: 200,
      },
      {
        datetime: { day: 29, hour: 23, minute: 53, second: 36 },
        document_size: 1325,
        host: "query2.lycos.cs.cmu.edu",
        request: {
          method: "GET",
          protocol: "HTTP",
          protocol_version: "1.0",
          url: "/Consumer.html",
        },
        response_code: 200,
      },
    ];
    expect(processData({ data })).toStrictEqual(result);
  });

  it("Process Line", () => {
    const data =
      '141.243.1.172 [29:23:53:25] "GET /Software.html HTTP/1.0" 200 1497';
    const result = {
      datetime: {
        day: 29,
        hour: 23,
        minute: 53,
        second: 25,
      },
      document_size: 1497,
      host: "141.243.1.172",
      request: {
        method: "GET",
        protocol: "HTTP",
        protocol_version: "1.0",
        url: "/Software.html",
      },
      response_code: 200,
    };
    expect(processLine({ line: data })).toStrictEqual(result);
  });
  it("Parse Date", () => {
    const date =
      '[29:23:53:25]';
    const result = {
        day: 29,
        hour: 23,
        minute: 53,
        second: 25,
      };
    expect(parseDate({ date })).toStrictEqual(result);
  });
  it("Parse Request", () => {
    const request = {
        method: '"GET',
        url: '/Software.html',
        protocol: 'HTTP/1.0"'
    };
    const result = {
        method: "GET",
        protocol: "HTTP",
        protocol_version: "1.0",
        url: "/Software.html",
      };
    expect(parseRequest(request)).toStrictEqual(result);
  });
  it("Parse File", () => {

  });
});
