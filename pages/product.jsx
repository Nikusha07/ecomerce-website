import Layout from "@/components/Layout";
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
          {products.map((product) => (
            <tr key={product._id}>
              <td className="text-black">{product.title}</td>
              <td>
                <Link
                  className="bg-blue-900 inline-flex flex-row text-white rounded-md py-1 px-2"
                  href={`/products/edit/${product._id}`}
                >
                  <EditIcon className="w-[18px] h-[18]" />
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
