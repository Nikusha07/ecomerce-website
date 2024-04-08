import Layout from "@/components/Layout";
import ProductForm from "@/components/productForm";

export default function NewProduct() {
  return (
    <Layout>
      <h1 className="text-[30px] flex justify-center text-blue-900 font-[500]">
        New Products
      </h1>
      <ProductForm />
    </Layout>
  );
}
