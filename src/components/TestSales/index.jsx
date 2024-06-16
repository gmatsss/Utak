import React, { useState } from "react";
import "./testsales.css";
import InfoIcon from "@mui/icons-material/Info";
import { useSales } from "../../context/SalesContext";
import { useAlert } from "../../util/Alert";

function Testsales() {
  const [isOpen, setIsOpen] = useState(false);
  const { simulateSale, resetSales, items } = useSales();
  const { showToast } = useAlert();

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const testSales = async () => {
    if (items.length > 0) {
      const randomIndex = Math.floor(Math.random() * items.length);
      const randomItem = items[randomIndex];
      await simulateSale(randomItem.id);
      showToast(
        "success",
        `Sold: ${randomItem.name} - Quantity: ${randomItem.sold + 1}`
      );
    }
  };

  const handleResetSales = async () => {
    await resetSales();
    showToast("info", "All sales have been reset.");
  };

  return (
    <div className="bubble-container">
      <button className="bubble" onClick={toggleDetails}>
        <InfoIcon fontSize="large" />
      </button>
      {isOpen && (
        <div className="details">
          <h4>Welcome to Your Dashboard</h4>
          <p>
            This section lets you track product performance and sales metrics to
            guide your business decisions. The 'Test Sale' button simulates
            purchases, allowing you to visualize potential sales trends through
            charts. Use the 'Reset' button to clear all records of sold items,
            resetting the data for fresh analysis."
          </p>
          <div className="button-container">
            <button onClick={testSales} className="action-button test">
              Test Sales
            </button>
            <button onClick={handleResetSales} className="action-button reset">
              Reset Sales
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Testsales;
