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
  const [properties, setProperties] = useState([]);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  async function saveCategory(ev) {
    ev.preventDefault();
    const formattedProperties = properties.map(p => ({
      name: p.name,
      values: p.values.split(',').map(value => value.trim())
    }));
    const data = { name, properties: formattedProperties };
    if (parentCategory !== "") {
      data.parentCategory = parentCategory;
    }
    if (editedCategory) {
      if (window.confirm("Are you sure you want to update this category?")) {
        data._id = editedCategory._id;
        try {
          await axios.put("/api/categories", data);
          setName("");
          setProperties([]);
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
    setProperties(category.properties.map(({name , values}) => ({
      name,
      values:values.join(',')
    })));
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
  function addProperty() {
    setProperties([...properties, { name: "", values: "" }]);
  }

  function handlePropertyNameChange(index, newName) {
    const newProperties = [...properties];
    newProperties[index].name = newName;
    setProperties(newProperties);
  }

  function handlePropertyValuesChange(index, newValues) {
    const newProperties = [...properties];
    newProperties[index].values = newValues;
    setProperties(newProperties);
  }
  function removeProperties(indexToRemove) {
    setProperties((prev) => {
      return prev.filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
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
      <form className="" onSubmit={saveCategory}>
        <div className="div flex gap-1">
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
        </div>
        <div className="mb-3">
          <label className="block">Properties</label>
          <button type="button" onClick={addProperty} className="Property-btn">
            Add new Property
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div className="flex mb-2" key={index}>
                <InputComponent
                  value={property.name}
                  placeholder="Property Name (example: color)"
                  onChange={(e) =>
                    handlePropertyNameChange(index, e.target.value)
                  }
                />
                <InputComponent
                  value={property.values}
                  placeholder="Values, comma separated"
                  onChange={(e) =>
                    handlePropertyValuesChange(index, e.target.value)
                  }
                />
                <button
                  onClick={() => removeProperties(index)}
                  className="Property-btn"
                >
                  remove
                </button>
              </div>
            ))}
        </div>
        <div className="flex gap-1">
          {editedCategory && (
            <button
              onClick={() => {setEditedCategories(null); setName('') ; setParentCategory('') ; setProperties([])} }
              type="button"
              className="btn-primary"
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn-primary">
            Save
          </button>
        </div>
      </form>
      {!editedCategory && (
        <>
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
        </>
      )}
    </Layout>
  );
}
