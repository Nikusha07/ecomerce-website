
import { mongooseConnect } from '@/lib/mongoose';
import Product from '@/models/Product';

export default async function handle(req, res) {
    const { method } = req;

    await mongooseConnect();
    if( method === 'GET' ) {
        res.json(await Product.find())
    }

    if (method === 'POST') {
        try {
            const { title, description, price } = req.body;

            const productDoc = await Product.create({
                title,
                description,
                price
            });

            await productDoc.save();

            res.status(201).json({ success: true, product: productDoc });
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
