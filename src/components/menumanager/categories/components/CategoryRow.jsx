import React from "react";

const CategoryRow = ({
  category,
  editingId,
  setEditingId,
  handleEditChange,
  saveChanges,
  deleteCategory,
}) => {
  return (
    <>
      {editingId === category.id ? (
        <>
          <td className="py-4 px-6">
            <input
              type="text"
              value={category.name}
              onChange={(e) => handleEditChange(e, category.id, "name")}
              className="w-full text-center bg-transparent border-b-2 border-black placeholder-gray-500 focus:outline-none"
              placeholder="Enter name"
            />
          </td>
          <td className="py-4 px-6">
            <input
              type="text"
              value={category.description}
              onChange={(e) => handleEditChange(e, category.id, "description")}
              className="w-full text-center bg-transparent border-b-2 border-black placeholder-gray-500 focus:outline-none"
              placeholder="Enter description"
            />
          </td>
          <td className="py-4 px-6">{category.itemsCount}</td>{" "}
          {/* Display itemsCount as static text */}
        </>
      ) : (
        <>
          <td className="py-4 px-6">{category.name}</td>
          <td className="py-4 px-6">{category.description}</td>
          <td className="py-4 px-6">{category.itemsCount}</td>
        </>
      )}
      <td className="py-4 px-6 flex justify-center items-center space-x-2">
        {editingId === category.id ? (
          <>
            <button
              onClick={() => saveChanges(category.id)}
              className="text-green-600 hover:text-green-900"
            >
              Save
            </button>
            <button
              onClick={() => setEditingId(null)}
              className="text-red-600 hover:text-red-900"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditingId(category.id)}
              className="text-blue-600 hover:text-blue-900"
            >
              Edit
            </button>
            <button
              onClick={() => deleteCategory(category.id)}
              className="text-red-600 hover:text-red-900"
            >
              Delete
            </button>
          </>
        )}
      </td>
    </>
  );
};

export default CategoryRow;
