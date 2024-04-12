import { mongooseConnect } from "@/lib/mongoose";
import Category from "@/models/Category";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'GET') {
        try {
            const categories = await Category.find().populate('parent');
            res.json(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else if (method === 'POST') {
        const { name, parentCategory, properties } = req.body;
        try {
            // Additional validation/transformation of properties may be needed here
            const categoryDoc = await Category.create({ name, parent: parentCategory || undefined, properties });
            res.json(categoryDoc);
        } catch (error) {
            console.error('Error creating category:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else if (method === 'PUT') {
        const { name, parentCategory, _id, properties } = req.body;
        try {
            // Additional validation/transformation of properties may be needed here
            const categoryDoc = await Category.findByIdAndUpdate(_id, { name, parent: parentCategory || undefined, properties }, { new: true });
            res.json(categoryDoc);
        } catch (error) {
            console.error('Error updating category:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else if (method === 'DELETE') {
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
