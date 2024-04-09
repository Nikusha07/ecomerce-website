import { mongooseConnect } from "@/lib/mongoose";
import Category from "@/models/Category";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'GET') {
        res.json(await Category.find().populate('parent'));
    } else if (method === 'POST') {
        const { name, parentCategory } = req.body;
        try {
            const categoryDoc = await Category.create({ name, parent: parentCategory });
            res.json(categoryDoc);
            console.log(categoryDoc);
        } catch (error) {
            console.error('Error creating category:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else if (method === 'PUT') {
        const { name, parentCategory, _id } = req.body;
        try {
            const categoryDoc = await Category.updateOne({ _id }, { name, parent: parentCategory });
            res.json(categoryDoc);
        } catch (error) {
            console.error('Error updating category:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else if (method === 'DELETE') {
        const { id } = req.query; // Assuming the ID is passed as a query parameter
        try {
            const deletedCategory = await Category.deleteOne({ _id: id }); // Correct usage
            if (deletedCategory.deletedCount === 0) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.json(deletedCategory);
        } catch (error) {
            console.error('Error deleting category:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
    