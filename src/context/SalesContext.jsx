import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, updateDoc, doc, onSnapshot } from "firebase/firestore";
import { Data } from "../config/firebase";

const SalesContext = createContext();

export function useSales() {
  return useContext(SalesContext);
}

export const SalesProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [salesHistory, setSalesHistory] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(Data, "items"),
      (querySnapshot) => {
        const itemsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(itemsArray);
      }
    );

    return () => unsubscribe();
  }, []);

  const simulateSale = async (itemId) => {
    const itemRef = doc(Data, "items", itemId);
    const currentItem = items.find((item) => item.id === itemId);
    const newSoldCount = (currentItem.sold || 0) + 1;
    const saleDate = new Date().toISOString().split("T")[0];

    await updateDoc(itemRef, {
      sold: newSoldCount,
    });

    setItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, sold: newSoldCount } : item
      )
    );

    setSalesHistory((history) => [
      ...history,
      { itemId, date: saleDate, revenue: currentItem.price },
    ]);
  };

  const resetSales = async () => {
    const updates = items.map((item) =>
      updateDoc(doc(Data, "items", item.id), { sold: 0 })
    );
    await Promise.all(updates);
    setItems((items) => items.map((item) => ({ ...item, sold: 0 })));
    setSalesHistory([]);
  };

  return (
    <SalesContext.Provider
      value={{ items, simulateSale, resetSales, salesHistory }}
    >
      {children}
    </SalesContext.Provider>
  );
};
