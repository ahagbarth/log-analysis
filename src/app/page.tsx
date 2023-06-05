"use client";
import { useEffect, useState } from "react";
import renderRequestsPerMinuteChart from "../utils/renderRequestsPerMinuteChart";
import renderHttpCodesChart from "../utils/renderHttpCodesChart";
import renderHttpMethodsChart from "../utils/renderHttpMethodsChart";
import renderResponseSizeChart from "../utils/renderResponseSizeChart";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch("/json/transformedData.json")
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error(error));
    }, 300);
  }, []);

  useEffect(() => {
    if (data) {
      renderRequestsPerMinuteChart(data);
      renderHttpMethodsChart(data);
      renderHttpCodesChart(data);
      renderResponseSizeChart(data);
    }
  }, [data]);

  return (
    <div>
      <p className="text-center text-xl font-extrabold py-10">
        Requests per Minute chart
      </p>
      <div className="chart-container max-h-[40rem] flex justify-center">
        <canvas id="requestsPerMinuteChart"></canvas>
      </div>
      <p className="text-center  text-xl  font-extrabold py-10">
        HTTP Methods chart
      </p>
      <div className="chart-container max-h-[40rem] flex justify-center">
        <canvas id="httpMethodsChart"></canvas>
      </div>
      <p className="text-center text-xl  font-extrabold py-10">
        HTTP Codes chart
      </p>
      <div className="chart-container max-h-[40rem] flex justify-center">
        <canvas id="httpCodesChart"></canvas>
      </div>
      <p className="text-center text-xl  font-extrabold py-10">
        Response Size Chart
      </p>
      <div className="chart-container max-h-[40rem] flex justify-center">
        <canvas id="responseSizeChart"></canvas>
      </div>
    </div>
  );
}
