import mongoose from 'mongoose';

export const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    parent: { type: mongoose.Types.ObjectId , ref: 'Category'}
});

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;
