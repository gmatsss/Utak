import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSales } from "../../../context/SalesContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const CostVsRevenueComparison = () => {
  const { items } = useSales();

  const data = useMemo(() => {
    let totalCost = 0;
    let totalRevenue = 0;

    items.forEach((item) => {
      totalCost += item.cost * item.sold;
      totalRevenue += item.price * item.sold;
    });

    return {
      labels: ["Total Cost ($)", "Total Revenue ($)"],
      datasets: [
        {
          data: [totalCost, totalRevenue],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
          ],
          hoverOffset: 4,
        },
      ],
    };
  }, [items]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Cost vs. Revenue Comparison",
      },
    },
  };

  return (
    <div className="chart-container">
      <Pie data={data} options={options} />
    </div>
  );
};

export default CostVsRevenueComparison;
