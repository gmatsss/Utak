import React from "react";
import CategoryRow from "./CategoryRow";

const CategoryTable = ({
  categories,
  editingId,
  setEditingId,
  handleEditChange,
  saveChanges,
  deleteCategory,
}) => {
  return (
    <table className="w-full text-sm md:text-base text-center text-gray-500 dark:text-gray-400">
      <thead className="text-sm md:text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
        <tr>
          <th scope="col" className="py-3 px-6">
            Name
          </th>
          <th scope="col" className="py-3 px-6">
            Description
          </th>
          <th scope="col" className="py-3 px-6">
            Number of Items
          </th>
          <th scope="col" className="py-3 px-6">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr
            key={category.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <CategoryRow
              category={category}
              editingId={editingId}
              setEditingId={setEditingId}
              handleEditChange={handleEditChange}
              saveChanges={saveChanges}
              deleteCategory={deleteCategory}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoryTable;
