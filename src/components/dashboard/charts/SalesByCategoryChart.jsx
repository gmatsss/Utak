import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSales } from "../../../context/SalesContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const SalesByCategoryChart = () => {
  const { items } = useSales();

  const data = useMemo(() => {
    const categorySales = {};

    items.forEach((item) => {
      if (categorySales[item.categoryId]) {
        categorySales[item.categoryId].sales += item.sold;
      } else {
        categorySales[item.categoryId] = {
          category: item.category,
          sales: item.sold,
        };
      }
    });

    const chartData = {
      labels: Object.values(categorySales).map((info) => info.category),
      datasets: [
        {
          label: "Sales by Category",
          data: Object.values(categorySales).map((info) => info.sales),
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
          ],
          hoverOffset: 4,
        },
      ],
    };

    return chartData;
  }, [items]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sales by Category",
      },
    },
  };

  return (
    <div className="chart-container">
      <Pie data={data} options={options} />
    </div>
  );
};

export default SalesByCategoryChart;
