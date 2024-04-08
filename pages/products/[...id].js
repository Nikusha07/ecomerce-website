import Layout from "@/components/Layout";
import ProductForm from "@/components/productForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditPageProduct() {
    const [productInfo, setProductInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!id) {
            return;
        }

        const segments = window.location.pathname.split('/');
        const index = parseInt(segments[segments.length - 1]);

        axios.get(`/api/product?id=${id}`)
            .then(response => {
                if (!isNaN(index) && index > 0 && index <= response.data.length) {
                    setProductInfo(response.data[index - 1]);
                } else {
                    setProductInfo(response.data[0]); 
                }
                setLoading(false);
            })
            .catch(error => {
                setError("Error fetching product. Please try again later.");
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <h1 className="text-[30px] flex justify-center text-blue-900 font-[500]">
                    Loading...
                </h1>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <h1 className="text-[30px] flex justify-center text-red-500 font-[500]">
                    {error}
                </h1>
            </Layout>
        );
    }

    return (
        <Layout>
            <h1 className="text-[30px] flex justify-center text-blue-900 font-[500]">
                Edit Products
            </h1>
            {productInfo && (
                <>
                    <ProductForm {...productInfo} />
                </>
            )}
        </Layout>
    );
}
