import { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import { Data } from "../../../config/firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  updateDoc,
  runTransaction,
} from "firebase/firestore";
import { useAlert } from "../../../util/Alert";
import { PropagateLoader } from "react-spinners";
import ItemTable from "./components/ItemTable";
import ItemModal from "./components/ItemModal";
import { useSales } from "../../../context/SalesContext";

const Item = () => {
  const { items, setItems } = useSales();
  const { showToast, showConfirm } = useAlert();
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setModalTagsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [editItem, setEditItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(Data, "categories"));
      const fetchedCategories = [];
      querySnapshot.forEach((doc) => {
        fetchedCategories.push({ id: doc.id, name: doc.data().name });
      });
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  const toggleModal = () => setModalTagsOpen(!isModalOpen);

  const addItem = async (item) => {
    const newItemRef = doc(collection(Data, "items"));
    const categoryRef = doc(Data, "categories", item.categoryId);

    try {
      await runTransaction(Data, async (transaction) => {
        const categoryDoc = await transaction.get(categoryRef);
        if (!categoryDoc.exists()) {
          throw new Error("Category document does not exist!");
        }

        const newItemsCount = (categoryDoc.data().itemsCount || 0) + 1;

        transaction.update(categoryRef, { itemsCount: newItemsCount });
        transaction.set(newItemRef, {
          ...item,
          category: categoryDoc.data().name,
          categoryId: item.categoryId,
        });
      });

      showToast("success", "Item created successfully!");
      toggleModal();
    } catch (error) {
      console.error("Transaction failed: ", error);
      showToast("error", "Failed to create item.");
    }
  };

  const updateItem = async (updatedItem) => {
    const itemRef = doc(Data, "items", updatedItem.id);
    await updateDoc(itemRef, updatedItem);
    showToast("success", "Item updated successfully!");
    toggleModal();
  };

  const handleCreateNew = () => {
    setEditItem(null);
    toggleModal();
  };

  const handleEdit = (item) => {
    setEditItem(item);
    toggleModal();
  };

  const deleteItem = async (id) => {
    showConfirm(
      "Are you sure?",
      "You won't be able to revert this!",
      async () => {
        const itemRef = doc(Data, "items", id);
        try {
          const itemDoc = await getDoc(itemRef);
          if (!itemDoc.exists()) {
            showToast("error", "Item does not exist.");
            return;
          }
          const categoryId = itemDoc.data().categoryId;

          await runTransaction(Data, async (transaction) => {
            const categoryRef = doc(Data, "categories", categoryId);
            const categoryDoc = await transaction.get(categoryRef);
            if (!categoryDoc.exists()) {
              throw new Error("Category document does not exist!");
            }
            const newItemsCount = (categoryDoc.data().itemsCount || 1) - 1;
            transaction.update(categoryRef, { itemsCount: newItemsCount });

            transaction.delete(itemRef);
          });

          showToast("success", "Item deleted successfully!");
        } catch (error) {
          console.error("Error deleting item: ", error);
          showToast("error", "Failed to delete item.");
        }
      }
    );
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsToShow = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const changePage = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex flex-row items-center justify-between mb-4">
          <h1 className="text-lg md:text-xl font-bold text-gray-700">Items</h1>
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
          onClick={handleCreateNew}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Create Item
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <PropagateLoader color="#36d7b7" />
        </div>
      ) : (
        <>
          <ItemTable
            items={itemsToShow}
            onEdit={handleEdit}
            onDelete={deleteItem}
          />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            changePage={changePage}
          />
        </>
      )}

      {isModalOpen && (
        <ItemModal
          toggleModal={toggleModal}
          onSubmit={editItem ? updateItem : addItem}
          item={editItem}
          categories={categories}
        />
      )}
    </div>
  );
};

export default Item;
