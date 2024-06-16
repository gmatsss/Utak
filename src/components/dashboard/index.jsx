import React from "react";
import DailySalesChart from "./charts/DailySalesChart";
import SalesByCategoryChart from "./charts/SalesByCategoryChart";
import AverageSalesPriceChart from "./charts/AverageSalesPriceChart";
import CostVsRevenueComparison from "./charts/CostVsRevenueComparison";
import TopSellingItemsChart from "./charts/TopSellingItemsChart";
import "./charts/chart.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Restaurant Dashboard</h1>
      <div className="chart-wrapper">
        <div className="chart">
          <SalesByCategoryChart />
        </div>
        <div className="chart">
          <CostVsRevenueComparison />
        </div>
        <div className="chart">
          <TopSellingItemsChart />
        </div>
      </div>
      <div className="chart-wrapper">
        <div className="chart-full">
          <DailySalesChart />
        </div>
        <div className="chart-full">
          <AverageSalesPriceChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
