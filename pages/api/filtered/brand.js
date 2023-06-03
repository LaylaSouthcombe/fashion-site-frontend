import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
    if(req.method !== 'POST'){
        res.json('should be a POST request')
        return
    }
    await mongooseConnect();
    const queryArray = req.body.queryArray
    console.log("filters ", queryArray)
    const queryConstraint = req.body.queryConstraint
    console.log(queryConstraint)
    let path = Object.keys(queryConstraint)[0]
    let value = Object.values(queryConstraint)[0].replace("-", " ")
    const getFilteredProducts = async () => {
        let products = await Product.aggregate([
        {
            $search: {
                index: "default",
                compound: {
                    filter: queryArray,
                    must: [{
                    text: {
                        query: value,
                        path: path
                    }
                }]
                },
                
            }
        }
        ]).limit(10)
        return products
    }

    const getAllProducts = async () => {
        let query = {}
        query[path] = value.toUpperCase()
        console.log(query)
        let products = await Product.find(query).limit(50)
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

    //TODO: add in page specifics so that only items for a single brand is returned, or only shoes

    
    shuffleArray(products)
    // console.log("products", products)

    // res.json(await Product.find({_id:ids}))
    res.json(products)
}