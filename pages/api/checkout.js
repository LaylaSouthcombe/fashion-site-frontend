import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
    await mongooseConnect();
    const products = req.body.products
    console.log(products)
    const ids = products.map(product => product.id)
    res.json(await Product.find({_id: ids}))
}