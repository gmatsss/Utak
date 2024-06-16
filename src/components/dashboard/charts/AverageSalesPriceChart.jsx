import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSales } from "../../../context/SalesContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const AverageSalesPriceChart = () => {
  const { items, salesHistory } = useSales();

  const data = useMemo(() => {
    const labels = items.map((item) => item.name);
    const salesData = items.map((item) => {
      const sales = salesHistory.filter((sale) => sale.itemId === item.id);
      const totalRevenue = sales.reduce((acc, sale) => acc + sale.revenue, 0);
      const avgPrice = sales.length > 0 ? totalRevenue / sales.length : 0;
      return avgPrice;
    });

    const backgroundColors = items.map(() => getRandomColor());
    const borderColors = backgroundColors.map((color) =>
      color.replace("0.2", "1")
    );

    return {
      labels,
      datasets: [
        {
          label: "Average Sales Price ($)",
          data: salesData,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
          fill: true,
          tension: 0.4,
        },
      ],
    };
  }, [items, salesHistory]);

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Average Sales Price per Item",
      },
    },
  };

  return (
    <div className="bar-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default AverageSalesPriceChart;
