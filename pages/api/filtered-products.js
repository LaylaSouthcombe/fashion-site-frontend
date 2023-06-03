import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
    if(req.method !== 'POST'){
        res.json('should be a POST request')
        return
    }
    await mongooseConnect();
    const queryArray = req.body
    console.log("filters ", queryArray)

    const getFilteredProducts = async () => {
        let products = await Product.aggregate([{
            $search: {
                index: "default",
                compound: {
                    should: queryArray
                }
            }
        }
        ]).limit(10)
        return products
    }

    const getAllProducts = async () => {
        let products = await Product.find({}).limit(50)
        return products
    }

    const products = queryArray.length > 0 ? await getFilteredProducts() : await getAllProducts()
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
    }
    
    shuffleArray(products)
    console.log("products", products)

    // res.json(await Product.find({_id:ids}))
    res.json(products)
}