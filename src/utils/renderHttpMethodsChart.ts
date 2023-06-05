import Chart from "chart.js/auto";
import { calculateHttpMethods } from "./getHttpChartData";

const renderHttpMethodsChart = (data: any[]) => {
  const httpMethods = calculateHttpMethods(data);

  const ctx = document.getElementById("httpMethodsChart").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(httpMethods),
      datasets: [
        {
          data: Object.values(httpMethods),
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
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });
};
export default renderHttpMethodsChart;
