import React, { useState, useEffect } from "react";
import InputComponent from "@/components/molecules/Input";
import axios from "axios";
import { useRouter } from "next/router";
import { UploadIcon } from "@/public/icons/uploadIcon";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  images: existedImages,
  _id,
  title: existedTitle,
  description: existedDescription,
  price: existedPrice,
  category: assignedCategory,
  properties:assignedProperties
}) {
  const [title, setTitle] = useState(existedTitle || "");
  const [category, setCategory] = useState(assignedCategory || "");
  const [images, setImages] = useState(existedImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const [description, setDescription] = useState(existedDescription || "");
  const [price, setPrice] = useState(existedPrice || "");
  const router = useRouter();
  const [error, setError] = useState("");
  const [goToProduct, setGoToProducts] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productProp, setProductProp] = useState(assignedProperties ||[]);

  useEffect(() => {
    axios.get("/api/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  const handleInputChange = (event, setValue) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
      category,
      properties : productProp
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
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }
  function updateImagesOrder(images) {
    setImages(images);
  }

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    if (catInfo && catInfo.properties) {
      propertiesToFill.push(...catInfo.properties);
    }
    
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo.parent._id
      );
      if (parentCat && parentCat.properties) {
        propertiesToFill.push(...parentCat.properties);
      }
      catInfo = parentCat;
    }
  }
  function setProductProperties(propName, value) {
    setProductProp((prevProductProp) => ({
      ...prevProductProp,
      [propName]: value
    }));
  }
  
  return (
    <div className="flex flex-col justify-start h-screen">
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-600">{error}</p>}
        <label>Product name</label>
        <InputComponent
          value={title}
          onChange={(e) => handleInputChange(e, setTitle)}
          placeholder="Product Name"
          type="text"
        />
        <div>
          <label> Categories </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
          {propertiesToFill.length > 0 &&
            propertiesToFill.map((p) => (
              <div key={p.name}>
                <span>{p.name}: </span>
                <select
                  value={productProp[p.name] || ""}
                  onChange={(e) => setProductProperties(p.name, e.target.value)}
                >
                  {p.values.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            ))}
        </div>
        <label> Images</label>
        <div className="mb-2 mt-2 flex gap-2">
          <ReactSortable
            className="flex flex-row gap-2"
            list={images}
            setList={updateImagesOrder}
          >
            {!!images?.length &&
              images.map((link) => (
                <div key={link}>
                  <img
                    src={link}
                    className="w-24 h-24 rounded-lg"
                    alt="product image"
                  />
                </div>
              ))}
          </ReactSortable>
          {isUploading && (
            <div className="h-24 flex items-center">
              <Spinner />
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
        <button type="submit" className="btn-primary mt-2">
          Save
        </button>
      </form>
    </div>
  );
}
