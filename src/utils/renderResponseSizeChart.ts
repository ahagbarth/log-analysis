import Chart from "chart.js/auto";
import { calculateResponseSizes } from "./getHttpChartData";

const renderResponseSizeChart = (data: any[]) => {
  const responseSizes = calculateResponseSizes(data);
  const ctx = document.getElementById("responseSizeChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(responseSizes),
      datasets: [
        {
          label: "Size of all requests with code 200 and size <1000B",

          data: Object.values(responseSizes),
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 205, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Responses",
          },
        },
        y: {
          title: {
            display: true,
            text: "Count",
          },
          beginAtZero: true,
        },
      },
    },
  });
};

export default renderResponseSizeChart;
