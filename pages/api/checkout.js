import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
    await mongooseConnect();
    const products = req.body.products

    const uniqueProducts = Array.from(new Set(products.map(JSON.stringify)), JSON.parse)

    const ids = uniqueProducts.map(product => product.id)

    let returnedProducts = await Product.find({_id: ids})

    let fullCheckedOutProducts = []
    uniqueProducts.forEach(product => {
        let foundProduct = returnedProducts.find(fullProduct => 
          fullProduct._id.toString() === product.id  
        )
        foundProduct = JSON.parse(JSON.stringify(foundProduct))
        foundProduct["size"] = product.size
        fullCheckedOutProducts.push(foundProduct)
    })

    res.json(fullCheckedOutProducts)
}