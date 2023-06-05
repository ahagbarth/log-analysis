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
  it("calculateHttpMethods - single get", () => {
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
      GET: 1,
    };
    expect(calculateHttpMethods(data)).toStrictEqual(result);
  });
  it("calculateHttpMethods - multiple get", () => {
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
      GET: 2,
    };
    expect(calculateHttpMethods(data)).toStrictEqual(result);
  });
  it("calculateHttpMethods - different method", () => {
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
          method: "POST",
          url: "/Software.html",
          protocol: "HTTP",
          protocol_version: "1.0",
        },
        response_code: 200,
        document_size: 1497,
      },
    ];
    const result = {
      GET: 1,
      POST: 1
    };
    expect(calculateHttpMethods(data)).toStrictEqual(result);
  });
});
