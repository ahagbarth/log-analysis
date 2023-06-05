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
  it("calculateHttpCodes - 200 ", () => {
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
      200: 1,
    };
    expect(calculateHttpCodes(data)).toStrictEqual(result);
  });
  it("calculateHttpCodes - 200 & 400 ", () => {
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
        response_code: 400,
        document_size: 1497,
      },
    ];
    const result = {
      200: 1,
      400: 1
    };
    expect(calculateHttpCodes(data)).toStrictEqual(result);
  });
  it("calculateHttpCodes - 2 - 200 ", () => {
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
      200: 2
    };
    expect(calculateHttpCodes(data)).toStrictEqual(result);
  });
});
