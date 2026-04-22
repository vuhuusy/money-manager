import { useState } from "react";
import { Plus } from "lucide-react";
import { useUser } from "../hooks/useUser";
import { useCategories } from "../hooks/useCategories";
import { Dashboard } from "../components/layout";
import { Modal } from "../components/common";
import { CategoryList } from "../components/category";
import { AddCategoryForm } from "../components/forms";

const Category = () => {
  useUser();
  const { data: categoryData, addCategory, updateCategory } = useCategories();
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAddCategory = async (category) => {
    await addCategory(category);
    setOpenAddCategoryModal(false);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setOpenEditCategoryModal(true);
  };

  const handleUpdateCategory = async (updatedCategory) => {
    await updateCategory(updatedCategory);
    setOpenEditCategoryModal(false);
    setSelectedCategory(null);
  };

  return (
    <Dashboard activeMenu="Category">
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">All Categories</h2>
          <button onClick={() => setOpenAddCategoryModal(true)} className="add-btn flex items-center gap-1">
            <Plus size={16} /> Add Category
          </button>
        </div>
        <CategoryList categories={categoryData} onEditCategory={handleEditCategory} />
        <Modal isOpen={openAddCategoryModal} onClose={() => setOpenAddCategoryModal(false)} title="Add Category">
          <AddCategoryForm onAddCategory={handleAddCategory} />
        </Modal>
        <Modal
          isOpen={openEditCategoryModal}
          onClose={() => { setOpenEditCategoryModal(false); setSelectedCategory(null); }}
          title="Update Category"
        >
          <AddCategoryForm onAddCategory={handleUpdateCategory} isEditing initialCategoryData={selectedCategory} />
        </Modal>
      </div>
    </Dashboard>
  );
};

export default Category;
