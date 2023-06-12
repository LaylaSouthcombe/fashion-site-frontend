import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
    await mongooseConnect();
    const products = req.body.products
    // console.log("checkout page products", products)
    const ids = products.map(product => product.id)
    // console.log("checkout page ids", ids)
    let returnedProducts = await Product.find({_id: ids})
    // console.log("returnedProducts ", returnedProducts )
    let fullCheckedOutProducts = []
    products.forEach(product => {
        let foundProduct = returnedProducts.find(fullProduct => 
          fullProduct._id.toString() === product.id  
        )
        foundProduct = JSON.parse(JSON.stringify(foundProduct))
        foundProduct["quantity"] = product.quantity
        foundProduct["size"] = product.size
        fullCheckedOutProducts.push(foundProduct)
    })
    res.json(fullCheckedOutProducts)
}