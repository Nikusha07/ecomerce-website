import { mongoose}  from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title: { type: String },
    description: String,
    price: { type: Number},
    images: {type: [String] }
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;