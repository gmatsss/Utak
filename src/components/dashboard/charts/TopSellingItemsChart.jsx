import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSales } from "../../../context/SalesContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const TopSellingItemsChart = () => {
  const { items } = useSales();

  const data = useMemo(() => {
    const sortedItems = [...items].sort((a, b) => b.sold - a.sold);

    const topItems = sortedItems.slice(0, 5);

    const chartData = {
      labels: topItems.map((item) => item.name),
      datasets: [
        {
          label: "Top Selling Items",
          data: topItems.map((item) => item.sold),
          backgroundColor: [
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 99, 132, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
          hoverOffset: 4,
        },
      ],
    };

    return chartData;
  }, [items]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top Selling Items",
      },
    },
  };

  return (
    <div className="chart-container">
      <Pie data={data} options={options} />
    </div>
  );
};

export default TopSellingItemsChart;
