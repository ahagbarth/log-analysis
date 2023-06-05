import Chart from "chart.js/auto";
import { calculateHttpCodes } from "./getHttpChartData";

const renderHttpCodesChart = (data: any[]) => {
  const httpCodes = calculateHttpCodes(data);

  const ctx = document.getElementById("httpCodesChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(httpCodes),
      datasets: [
        {
          label: "HTTP Answer Codes",
          data: Object.values(httpCodes),
          backgroundColor: "rgba(75, 192, 192, 0.7)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "HTTP Code",
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
export default renderHttpCodesChart;
