import Layout from "@/components/Layout";
import InputComponent from "@/components/molecules/Input";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Categories() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  

  async function saveCategory(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post("/api/categories", { name });
      console.log(response.data);
      setName("");
      // Fetch categories again after adding a new category
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      setError("An error occurred while saving the category.");
    }
  }

  async function fetchCategories() {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data); // Update categories state with fetched data
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("An error occurred while fetching categories.");
    }
  }

  useEffect(() => {
    // Fetch categories when the component mounts
    fetchCategories();
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <Layout>
      <h1>Categories</h1>
      <label>New category name</label>
      <form className="flex gap-1 " onSubmit={saveCategory}>
        <InputComponent
          className="mr-0 "
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={"category name"}
        />
        <select>
          <option value="">no parent categories</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category._id}>
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
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {error && <p>{error}</p>}
    </Layout>
  );
}
