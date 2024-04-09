
import { mongooseConnect } from "@/lib/mongoose";
import Category from "@/models/Category";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'GET') {
        res.json(await Category.find().populate('parent'));
    }
    if (method === 'POST') {
        const { name , parentCategory} = req.body;
        try {
            const categoryDoc = await Category.create({ name , parent:parentCategory });
            res.json(categoryDoc);
            console.log(categoryDoc);
        } catch (error) {
            console.error('Error creating category:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
