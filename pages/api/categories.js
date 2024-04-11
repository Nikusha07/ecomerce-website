import { mongooseConnect } from "@/lib/mongoose";
import Category from "@/models/Category";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'GET') {
        // Handle GET request
        try {
            const categories = await Category.find().populate('parent');
            res.json(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else if (method === 'POST') {
        // Handle POST request
        const { name, parentCategory } = req.body;
        try {
            const categoryDoc = await Category.create({ name, parent: parentCategory });
            res.json(categoryDoc);
        } catch (error) {
            console.error('Error creating category:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else if (method === 'PUT') {
        // Handle PUT request
        const { name, parentCategory, _id } = req.body;
        try {
            const categoryDoc = await Category.findByIdAndUpdate(_id, { name, parent: parentCategory }, { new: true });
            res.json(categoryDoc);
        } catch (error) {
            console.error('Error updating category:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }  else if (method === 'DELETE') {
        try {
            const { id } = req.query;

            await Category.deleteOne({ _id: id });

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
