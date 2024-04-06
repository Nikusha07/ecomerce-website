import Layout from "@/components/Layout";
import Link from "next/link";
export default function Product(){
    return(
        <Layout>
            <Link className="bg-blue-900 text-white rounded-md py-1 px-2" href={'/products/new'}>add new product</Link>
        </Layout>
    )
}

