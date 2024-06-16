import { useEffect, useState } from "react";
import CategoryTable from "./components/CategoryTable ";
import Pagination from "./components/Pagination";
import CreateCategoryModal from "./components/CreateCategoryModal";
import { Data } from "../../../config/firebase";

import {
  doc,
  setDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { useAlert } from "../../../util/Alert";
import { PropagateLoader } from "react-spinners";

const Categories = () => {
  const { showToast, showConfirm } = useAlert();
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [editingId, setEditingId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    itemsCount: 0,
  });

  const toggleModal = () => setModalOpen(!isModalOpen);

  const handleSubmit = (e) => {
    e.preventDefault();
    const categoryRef = doc(Data, "categories", Date.now().toString());
    setDoc(categoryRef, newCategory)
      .then(() => {
        setNewCategory({ name: "", description: "", itemsCount: 0 });
        toggleModal();
        setCategories([...categories, { ...newCategory, id: categoryRef.id }]);
        showToast("success", "Category created successfully!");
      })
      .catch((error) => {
        console.error("Error adding document to Firestore: ", error);
        showToast("error", "Failed to create category.");
      });
  };

  const handleEditChange = (e, id, field) => {
    const newCategories = categories.map((cat) => {
      if (cat.id === id) {
        return { ...cat, [field]: e.target.value };
      }
      return cat;
    });
    setCategories(newCategories);
  };

  const saveChanges = async (id) => {
    const updatedCategory = categories.find((cat) => cat.id === id);
    const categoryRef = doc(Data, "categories", id);
    try {
      await updateDoc(categoryRef, updatedCategory);
      setEditingId(null);
      showToast("success", "Category updated successfully!");
    } catch (error) {
      console.error("Error updating category: ", error);
      showToast("error", "Failed to update category.");
    }
  };

  const deleteCategory = async (id) => {
    const itemsRef = collection(Data, "items");
    const querySnapshot = await getDocs(
      query(itemsRef, where("categoryId", "==", id))
    );

    if (!querySnapshot.empty) {
      showToast(
        "warning",
        "This category has items associated with it and cannot be deleted."
      );
      return;
    }

    showConfirm(
      "Are you sure?",
      "You won't be able to revert this!",
      async () => {
        const categoryRef = doc(Data, "categories", id);
        try {
          await deleteDoc(categoryRef);
          setCategories(categories.filter((cat) => cat.id !== id));
          showToast("success", "Category deleted successfully!");
        } catch (error) {
          console.error("Error deleting category: ", error);
          showToast("error", "Failed to delete category.");
        }
      }
    );
  };

  useEffect(() => {
    setLoading(true);
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(Data, "categories"));
      const fetchedCategories = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(fetchedCategories);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex flex-row items-center justify-between mb-4">
          <h1 className="text-lg md:text-xl font-bold text-gray-700">
            Categories
          </h1>
          <div className="flex-grow ml-4 flex items-center border-b border-gray-300">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name"
              className="bg-transparent flex-grow py-2 px-4 text-gray-700 focus:outline-none"
            />
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <button
          onClick={toggleModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
        >
          Create Category
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <PropagateLoader color="#36d7b7" />
        </div>
      ) : (
        <>
          <CategoryTable
            categories={currentItems}
            editingId={editingId}
            setEditingId={setEditingId}
            handleEditChange={handleEditChange}
            saveChanges={saveChanges}
            deleteCategory={deleteCategory}
          />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            changePage={setCurrentPage}
          />
        </>
      )}

      {isModalOpen && (
        <CreateCategoryModal
          toggleModal={toggleModal}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Categories;
