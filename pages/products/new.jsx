import Layout from "@/components/Layout";
import InputComponent from "@/components/molecules/Input";
import TextArea from "@/components/molecules/textarea";
import axios from "axios";
import { useState } from "react";

export default function NewProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  async function createProduct(ev) {
    ev.preventDefault();
    
    const data = {
      title: title,
      description: description,
      price: price
    };
    console.log(data.title);
    console.log('evv-->' ,  ev)

    try {
      const response = await axios.post('/api/product', data);
      console.log(response.data); 

      setTitle("");
      setDescription("");
      setPrice("");
    } catch (error) {
      console.error('Error saving product:', error); 
    }
  }

  return (
    <Layout>
      <div className="flex flex-col justify-start">
        <form onSubmit={createProduct}>
          <h1 className="text-[30px] flex justify-center text-blue-900 font-[500]">
            New Products
          </h1>
          <label>Product name</label>
          <InputComponent
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="Product Name"
            type="text"
          />
          <label>Description</label>
          <TextArea
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <label>Price in (USD$)</label>
          <InputComponent
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
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
