import React, { useEffect, useState } from "react";

const ItemModal = ({ item, toggleModal, onSubmit, categories }) => {
  const [tempOption, setTempOption] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
  const [newItem, setNewItem] = useState({
    categoryId: "",
    category: "",
    name: "",
    price: 0,
    cost: 0,
    stock: 0,
    options: [],
    sold: 0,
  });

  useEffect(() => {
    setNewItem(
      item
        ? {
            ...item,
            options: Array.isArray(item.options) ? item.options : [],
          }
        : {
            categoryId: "",
            category: "",
            name: "",
            price: 0,
            cost: 0,
            stock: 0,
            options: [],
          }
    );
  }, [item]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    if (name === "price" || name === "cost") {
      updatedValue = parseFloat(value);
    } else if (name === "stock") {
      updatedValue = parseInt(value, 10);
    }

    setNewItem((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const handleOptionChange = (e) => {
    setTempOption(e.target.value);
  };

  const showOptionInput = () => {
    setInputVisible(true);
  };

  const addOption = () => {
    if (tempOption.trim()) {
      setNewItem((prev) => ({
        ...prev,
        options: [...prev.options, tempOption.trim()],
      }));
      setTempOption("");
      setInputVisible(false);
    }
  };

  const removeOption = (index) => {
    setNewItem((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...newItem,
      sold: newItem.sold || 0,
    });
    setNewItem({
      categoryId: "",
      category: "",
      name: "",
      price: 0,
      cost: 0,
      stock: 0,
      options: [],
      sold: 0,
    });
    toggleModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-4xl w-full mx-4">
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
          Create New Item
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/3 px-3 mb-6">
            <label
              htmlFor="category"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Category:
            </label>
            <select
              id="category"
              name="categoryId"
              value={newItem.categoryId}
              onChange={handleInputChange}
              required
              disabled={!!item}
              className="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
              required
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6">
            <label
              htmlFor="price"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Price ($):
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={newItem.price}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6">
            <label
              htmlFor="cost"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Cost ($):
            </label>
            <input
              type="number"
              id="cost"
              name="cost"
              value={newItem.cost}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6">
            <label
              htmlFor="stock"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Stock:
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={newItem.stock}
              onChange={handleInputChange}
              required
              min="0"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6">
            <label
              htmlFor="options"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Variations:
            </label>
            {!inputVisible && (
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={showOptionInput}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                  Add Variations
                </button>
              </div>
            )}
            {inputVisible && (
              <div className="flex items-center">
                <input
                  type="text"
                  id="options"
                  name="options"
                  value={tempOption}
                  onChange={handleOptionChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
                <button
                  type="button"
                  onClick={addOption}
                  className="ml-2 text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
                >
                  ✓
                </button>
              </div>
            )}
            <div className="mt-2">
              {newItem.options.map((option, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700">{option}</span>
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full px-3 mb-6 flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex-grow mr-2"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={toggleModal}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg flex-grow ml-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemModal;
