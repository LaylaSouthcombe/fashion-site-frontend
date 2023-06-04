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

    let path = queryConstraint.path
    let value = queryConstraint.value.replace("-", " ")

    let query = {$or: []}
    query[path] = value

    Object.keys(queryArray).forEach(key => {
        if(queryArray[key].length){
            if(key !== 'sizesAndStock'){
                let newQueryFilter = {}
                newQueryFilter[key] = { $in: queryArray[key] }
                query.$or.push(newQueryFilter) 
            } else {
                queryArray[key].forEach(size => {
                    let newQueryFilter = {}
                    newQueryFilter[key] = { $elemMatch: { size: size, stock: { $gt: 0 } } }
                    query.$or.push(newQueryFilter) 
                })
            }
        }
    })
    
    let sortResultsOptions = {
        recommended: { $sample: { size: 2000} },
        lowestPrice: { $sort : { price : 1 } },
        highestPrice: { $sort : { price : -1 } },
        newIn: { $sort : { _id : -1 } }
    }

    const getFilteredProducts = async () => {
        let products = await Product.aggregate(
            [
                {
                  $match: query
                },
                sortResultsOptions[req.body.sortResults]
              ]
        )
        return products
    }

    const getAllProducts = async () => {
        let query = {}

        let regexString = ''
        for(let i = 0; i < value.split(" ").length ; i++){
            regexString = regexString.concat(value.split(" ")[i])
            if(i !== value.split(" ").length - 1){
                regexString = regexString.concat(".*")
            }
        }

        let pattern = new RegExp(regexString)

        query[path] = { $regex: pattern, $options: 'si'}
        let products = await Product.find(query)
        return products
    }

    const products = query.$or.length > 0 ? await getFilteredProducts() : await getAllProducts()

    res.json(products)
}