import { mongooseConnect } from '@/lib/mongoose';
import Product from '@/models/Product';

export default async function handle(req, res) {
    const { method } = req;

    try {
        await mongooseConnect();

        if (method === 'GET') {
            const products = await Product.find();
            res.status(200).json(products);
        } else if (method === 'POST') {
            const { title, description, price, images, category, properties } = req.body;

            const product = new Product({
                title,
                description,
                price,
                images,
                category,
                properties
            });

            const savedProduct = await product.save();

            res.status(201).json({ success: true, product: savedProduct });
        } else if (method === 'PUT') {
            const { _id, title, description, price, images, category, properties } = req.body;

            const updatedProduct = await Product.findByIdAndUpdate(
                _id,
                { title, description, price, images, category, properties },
                { new: true }
            );

            res.status(200).json({ success: true, product: updatedProduct });
        } else if (method === 'DELETE') {
            const { id } = req.query;

            await Product.findByIdAndDelete(id);

            res.status(200).json({ success: true });
        } else {
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}
