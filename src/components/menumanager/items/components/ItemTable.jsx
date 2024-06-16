import React from "react";

const ItemTable = ({ items, onEdit, onDelete }) => {
  const renderOptions = (options) => {
    if (Array.isArray(options)) {
      return options.join(", ");
    }
    return options;
  };

  return (
    <table className="w-full text-sm md:text-base text-center text-gray-500 dark:text-gray-400">
      <thead className="text-sm md:text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
        <tr>
          <th scope="col" className="py-3 px-6">
            Category
          </th>
          <th scope="col" className="py-3 px-6">
            Name
          </th>
          <th scope="col" className="py-3 px-6">
            Variations
          </th>
          <th scope="col" className="py-3 px-6">
            Price
          </th>
          <th scope="col" className="py-3 px-6">
            Cost
          </th>
          <th scope="col" className="py-3 px-6">
            Stock
          </th>
          <th scope="col" className="py-3 px-6">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            key={item.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <td className="py-4 px-6">{item.category}</td>
            <td className="py-4 px-6">{item.name}</td>
            <td className="py-4 px-6">{renderOptions(item.options)}</td>
            <td className="py-4 px-6">${item.price.toFixed(2)}</td>
            <td className="py-4 px-6">${item.cost.toFixed(2)}</td>
            <td className="py-4 px-6">{item.stock}</td>
            <td className="py-4 px-6">
              <button
                onClick={() => onEdit(item)}
                className="text-blue-600 hover:text-blue-900"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="text-red-600 hover:text-red-900 ml-4"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ItemTable;
