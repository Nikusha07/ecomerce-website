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
          setEditedCategories(null); // Clear edited category
          fetchCategories(); // Fetch categories again to refresh data
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

  async function deleteCategory(category) {
    try {
      await axios.delete(`/api/categories/${category}`); // Corrected URL construction
      fetchCategories(); // Assuming this function fetches the updated list of categories after deletion
      setError(""); // Clearing any previous errors
    } catch (error) {
      console.error("Error deleting category:", error);
      setError("An error occurred while deleting the category.");
    }
  }
  return (
    <Layout>
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
                  onClick={() => deleteCategory(category)}
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
