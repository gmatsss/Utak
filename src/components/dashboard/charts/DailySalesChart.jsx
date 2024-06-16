import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSales } from "../../../context/SalesContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DailySalesChart = () => {
  const { salesHistory } = useSales();

  const data = useMemo(() => {
    const dailySales = {};

    salesHistory.forEach((sale) => {
      if (!dailySales[sale.date]) {
        dailySales[sale.date] = 0;
      }
      dailySales[sale.date] += sale.revenue;
    });

    const labels = Object.keys(dailySales).sort();
    const salesData = labels.map((date) => dailySales[date]);

    return {
      labels,
      datasets: [
        {
          label: "Daily Sales ($)",
          data: salesData,
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          borderColor: "rgba(53, 162, 235, 0.8)",
          borderWidth: 1,
        },
      ],
    };
  }, [salesHistory]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Sales Overview",
      },
    },
  };

  return (
    <div className="bar-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default DailySalesChart;
