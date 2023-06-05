import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";
import "@testing-library/jest-dom";
import {
  calculateHttpCodes,
  calculateHttpMethods,
  calculateRequestsPerMinute,
  calculateResponseSizes,
} from "../src/utils/getHttpChartData";

describe("Chart Data", () => {
  it("calculateRequestsPerMinute - single minute", () => {
    const data = [
      {
        host: "141.243.1.172",
        datetime: {
          day: 29,
          hour: 23,
          minute: 53,
          second: 25,
        },
        request: {
          method: "GET",
          url: "/Software.html",
          protocol: "HTTP",
          protocol_version: "1.0",
        },
        response_code: 200,
        document_size: 1497,
      },
    ];
    const result = {
      1219: 1,
    };
    expect(calculateRequestsPerMinute(data)).toStrictEqual(result);
  });
  it("calculateRequestsPerMinute - two in same minute", () => {
    const data = [
      {
        host: "141.243.1.172",
        datetime: {
          day: 29,
          hour: 23,
          minute: 53,
          second: 25,
        },
        request: {
          method: "GET",
          url: "/Software.html",
          protocol: "HTTP",
          protocol_version: "1.0",
        },
        response_code: 200,
        document_size: 1497,
      },
      {
        host: "141.243.1.172",
        datetime: {
          day: 29,
          hour: 23,
          minute: 53,
          second: 25,
        },
        request: {
          method: "GET",
          url: "/Software.html",
          protocol: "HTTP",
          protocol_version: "1.0",
        },
        response_code: 200,
        document_size: 1497,
      },
    ];
    const result = {
      1219: 2,
    };
    expect(calculateRequestsPerMinute(data)).toStrictEqual(result);
  });
  it("calculateRequestsPerMinute - two different hours", () => {
    const data = [
      {
        host: "141.243.1.172",
        datetime: {
          day: 29,
          hour: 23,
          minute: 53,
          second: 25,
        },
        request: {
          method: "GET",
          url: "/Software.html",
          protocol: "HTTP",
          protocol_version: "1.0",
        },
        response_code: 200,
        document_size: 1497,
      },
      {
        host: "141.243.1.172",
        datetime: {
          day: 29,
          hour: 12,
          minute: 53,
          second: 25,
        },
        request: {
          method: "GET",
          url: "/Software.html",
          protocol: "HTTP",
          protocol_version: "1.0",
        },
        response_code: 200,
        document_size: 1497,
      },
    ];
    const result = {
      1219: 1,
      636: 1
    };
    expect(calculateRequestsPerMinute(data)).toStrictEqual(result);
  });
});
