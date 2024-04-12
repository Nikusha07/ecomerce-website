import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    images: { type: [String] },
    category : {type:mongoose.Types.ObjectId, ref:'Category'},
    properties: {type:Object}
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;