import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import InputComponent from "@/components/molecules/Input";
import axios from "axios";
import { useRouter } from "next/router";

export default function NewProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const [goToProduct, setGoToProducts] = useState(false);

  const handleInputChange = (event, setValue) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      title,
      description,
      price,
    };

    try {
      const response = await axios.post("/api/product", data);
      console.log("Response:", response.data);
      setGoToProducts(true);

      setTitle("");
      setDescription("");
      setPrice("");
      setError("");
    } catch (error) {
      console.error("Error saving product:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
        setError(
          error.response.data.message ||
            "An error occurred while saving the product."
        );
      } else {
        setError("An error occurred while processing your request.");
      }
    }
  };

  useEffect(() => {
    if (goToProduct) {
      router.push("/product");
    }
  }, [goToProduct]);

  return (
    <Layout>
      <div className="flex flex-col justify-start">
        <form onSubmit={handleSubmit}>
          <h1 className="text-[30px] flex justify-center text-blue-900 font-[500]">
            New Products
          </h1>
          {error && <p className="text-red-600">{error}</p>}
          <label>Product name</label>
          <InputComponent
            value={title}
            onChange={(e) => handleInputChange(e, setTitle)}
            placeholder="Product Name"
            type="text"
          />
          <label>Description</label>
          <InputComponent
            height={100}
            value={description}
            onChange={(e) => handleInputChange(e, setDescription)}
          />
          <label>Price in (USD$)</label>
          <InputComponent
            value={price}
            onChange={(e) => handleInputChange(e, setPrice)}
            placeholder="Price"
            type="number"
          />
          <button type="submit" className="btn-primary">
            Save
          </button>
        </form>
      </div>
    </Layout>
  );
}
