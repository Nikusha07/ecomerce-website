import React, { useState, useEffect } from "react";
import InputComponent from "@/components/molecules/Input";
import axios from "axios";
import { useRouter } from "next/router";
import { UploadIcon } from "@/public/icons/uploadIcon";
import Spinner from "./Spinner";
 
export default function ProductForm({
  images:existedImages,
  _id,
  title: existedTitle,
  description: existedDescription,
  price: existedPrice,
}) {
  const [title, setTitle] = useState(existedTitle || "");
  const [images , setImages] = useState(existedImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const [description, setDescription] = useState(existedDescription || "");
  const [price, setPrice] = useState(existedPrice || "");
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
      images
    };

    if (_id) {
      await axios.put("/api/product", { ...data, _id });
    } else {
      await axios.post("/api/product", data);
    }
    setGoToProducts(true);
  };

  useEffect(() => {
    if (goToProduct) {
      router.push("/product");
    }
  }, [goToProduct]);

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for(const file of files){
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages(oldImages =>{
        return [...oldImages, ...res.data.links]
      });
      setIsUploading(false);
    }
  }
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
        <label>Images</label>
        <div className="mb-2 flex gap-2">
          
          {!!images?.length && images.map(link => (
            <div key={link}>
              <img
                src={link}
                className="w-24 h-24 rounded-lg"
                alt="product image"
              />
            </div>
          ))}
          {isUploading &&(
            <div className="h-24 flex items-center">
              <Spinner/>
            </div>
          )}
          <label className="border cursor-pointer bg-gray-200 rounded-lg text-sm w-24 h-24 flex flex-col text-gray-500 items-center justify-center gap-1">
            <UploadIcon className="w-7" />
            <div>Upload</div>
            <input onChange={uploadImages} className="hidden" type="file" />
          </label>
        </div>
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
