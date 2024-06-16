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
      let randomIndex = Math.floor(Math.random() * items.length);
      let randomItem = items[randomIndex];

      if (randomItem.stock <= 0) {
        randomItem = items.find((item) => item.stock > 0);
        if (!randomItem) {
          showToast("error", "No items with available stock please re stock.");
          return;
        }
      }

      const maxQuantity = Math.min(randomItem.stock, 10);
      const soldQuantity = Math.floor(Math.random() * maxQuantity) + 1;

      const newSoldCount = randomItem.sold + soldQuantity;
      const newStockCount = randomItem.stock - soldQuantity;

      await simulateSale(randomItem.id, newSoldCount, newStockCount);
      showToast(
        "success",
        `Sold: ${randomItem.name} - Quantity: ${soldQuantity}`
      );
    } else {
      showToast("error", "No items available for sale.");
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
