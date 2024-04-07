// pages/api/product.js

import { mongooseConnect } from '@/lib/mongoose';
import Product from '@/models/Product';

export default async function handle(req, res) {
    const { method } = req;

    // Connect to MongoDB
    await mongooseConnect();

    if (method === 'POST') {
        try {
            const { title, description, price } = req.body;

            // Create a new Product document
            const productDoc = await Product.create({
                title,
                description,
                price
            });

            // Save the document to the database
            await productDoc.save();

            // Send a success response
            res.status(201).json({ success: true, product: productDoc });
        } catch (error) {
            // Handle errors
            console.error('Error creating product:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    } else {
        // Handle invalid HTTP methods
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
