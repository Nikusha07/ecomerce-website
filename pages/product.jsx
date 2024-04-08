import Layout from "@/components/Layout";
import { DeleteIcon } from "@/public/icons/deleteIcon";
import { EditIcon } from "@/public/icons/editIcon";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/product?id=${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Layout>
      <Link
        className="bg-blue-900 text-white rounded-md py-1 px-2"
        href={"/products/new"}
      >
        add new product
      </Link>
      <table className="basic mt-3">
        <thead>
          <tr>
            <td>Title</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map((product , index) => (
            <tr key={product._id} className="w-[300px]">
              <td className="text-black">{product.title}</td>
              <td className="flex gap-[5px] ">
                <Link
                  href={`/products/edit/${product._id}/${index + 1}`} 
                  passHref 
                >
                  <h1 className="bg-blue-900 inline-flex flex-row text-white rounded-md py-1 px-2">
                  <EditIcon className="w-6" />
                    Edit
                  </h1>
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 inline-flex items-center gap-[5px] flex-row text-white rounded-md py-1 px-2"
                >
                  <DeleteIcon/>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
