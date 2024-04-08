import React, { useState, useEffect } from "react";
import InputComponent from "@/components/molecules/Input";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProductForm({ _id,title:existedTitle , description:existedDescription , price:existedPrice}) {
    const [title, setTitle] = useState(existedTitle || "");
    const [description, setDescription] = useState(existedDescription || "");
    const [price, setPrice] = useState(existedPrice ||"");
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
    
      if(_id){
        await axios.put("/api/product" , {...data , _id})
      }else{
        await axios.post("/api/product" , data )
      }
      setGoToProducts(true);
    };
  
    useEffect(() => {
      if (goToProduct) {
        router.push("/product");
      }
    }, [goToProduct]);
  
    return (
        <div className="flex flex-col justify-start">
          <form onSubmit={handleSubmit}>
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
    );
  }