import { calculateRequestsPerMinute } from "./getHttpChartData";
import Chart from "chart.js/auto";

const renderRequestsPerMinuteChart = (data) => {
  const requestsPerMinute = calculateRequestsPerMinute(data);

  const ctx = document
    .getElementById("requestsPerMinuteChart")
    .getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: Object.keys(requestsPerMinute),
      datasets: [
        {
          label: "Requests per Minute",
          data: Object.values(requestsPerMinute),
          fill: false,
          borderColor: "rgba(75, 192, 192, 1)",
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Time (Minute)",
          },
        },
        y: {
          title: {
            display: true,
            text: "Requests",
          },
          beginAtZero: true,
        },
      },
    },
  });
};
export default renderRequestsPerMinuteChart;
