import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
    await mongooseConnect();
    const products = req.body.products
    // console.log("checkout page products", products)
    const uniqueProducts = Array.from(new Set(products.map(JSON.stringify)), JSON.parse)
    console.log("uniqueProducts", uniqueProducts)
    const ids = uniqueProducts.map(product => product.id)
    // console.log("checkout page ids", ids)
    let returnedProducts = await Product.find({_id: ids})
    // console.log("returnedProducts ", returnedProducts )
    //filter products out for unqiue sizes and apply to the below
    let fullCheckedOutProducts = []
    uniqueProducts.forEach(product => {
        console.log(product)
        let foundProduct = returnedProducts.find(fullProduct => 
          fullProduct._id.toString() === product.id  
        )
        foundProduct = JSON.parse(JSON.stringify(foundProduct))
        foundProduct["size"] = product.size
        fullCheckedOutProducts.push(foundProduct)
    })
    console.log("fullCheckedOutProducts",fullCheckedOutProducts)
    res.json(fullCheckedOutProducts)
}