import Layout from "@/components/Layout";
import InputComponent from "@/components/molecules/Input";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Categories() {
  const [editedCategory, setEditedCategories] = useState(null);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  async function saveCategory(ev) {
    ev.preventDefault();
    const data = { name };
    if (parentCategory !== "") {
      data.parentCategory = parentCategory;
    }
    if (editedCategory) {
      if (window.confirm("Are you sure you want to update this category?")) {
        data._id = editedCategory._id;
        try {
          await axios.put("/api/categories", data);
          setName("");
          setParentCategory("");
          setEditedCategories(null);
          fetchCategories();
          setError("");
        } catch (error) {
          console.error("Error updating category:", error);
          setError("An error occurred while updating the category.");
        }
      }
    } else {
      try {
        const response = await axios.post("/api/categories", data);
        console.log(response.data);
        setName("");
        setParentCategory("");
        fetchCategories();
        setError("");
      } catch (error) {
        console.error("Error saving category:", error);
        setError("An error occurred while saving the category.");
      }
    }
  }

  async function fetchCategories() {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("An error occurred while fetching categories.");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  function editCategory(category) {
    setEditedCategories(category);
    setName(category.name);
    setParentCategory(category.parent?._id || "");
  }

  async function deleteCategory() {
    if (categoryToDelete) {
      try {
        console.log("Deleting category with ID:", categoryToDelete._id); 
        await axios.delete(`/api/categories?id=${categoryToDelete._id}`);
        fetchCategories();
        setError("");
        setShowConfirmation(false);
      } catch (error) {
        console.error("Error deleting category:", error);
        setError("An error occurred while deleting the category.");
      }
    }
  }

  return (
    <Layout>
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow">
            <p>Are you sure you want to delete "{categoryToDelete?.name}"?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={deleteCategory}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowConfirmation(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit Category ${editedCategory.name}`
          : "Create New Category"}
      </label>
      <form className="flex gap-1 " onSubmit={saveCategory}>
        <InputComponent
          className="mr-0 "
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
        />
        <select
          onChange={(e) => setParentCategory(e.target.value)}
          value={parentCategory || ""}
        >
          <option value="">No Parent Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <button className="btn-primary">Save</button>
      </form>
      <table className="basic">
        <thead>
          <tr>
            <th>Name</th>
            <th>Parent</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>{category.parent?.name || "None"}</td>
              <td>
                <button
                  onClick={() => editCategory(category)}
                  className="btn-primary mr-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setShowConfirmation(true);
                    setCategoryToDelete(category);
                  }}
                  className="btn-primary"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <p>{error}</p>}
    </Layout>
  );
}
