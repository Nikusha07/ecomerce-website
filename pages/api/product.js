import { mongooseConnect } from '@/lib/mongoose';
import Product from '@/models/Product';

export default async function handle(req, res) {
    const { method } = req;

    await mongooseConnect();

    if (method === 'GET') {
        res.json(await Product.find());
    } else if (method === 'POST') {
        try {
            const { title, description, price, images } = req.body;

            const productDoc = await Product.create({
                title,
                description,
                price,
                images // Assuming images is an array of image URLs
            });

            await productDoc.save();

            res.status(201).json({ success: true, product: productDoc });
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    } else if (method === 'PUT') {
        try {
            const { _id, title, description, price, images } = req.body;

            await Product.updateOne({ _id }, { title, description, price, images });

            res.json(true);
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    } else if (method === 'DELETE') {
        try {
            const { id } = req.query;

            await Product.deleteOne({ _id: id });

            res.json(true);
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
