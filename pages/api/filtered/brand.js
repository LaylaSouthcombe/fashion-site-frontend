import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
    if(req.method !== 'POST'){
        res.json('should be a POST request')
        return
    }

    await mongooseConnect();
    const filters = req.body.filters

    const queryConstraint = req.body.queryConstraint
    
    let path = queryConstraint.path
    let value = queryConstraint.value.replace("-", " ")

    let query = {$or: []}
    query[path] = value

    let allProductsQuery = {}
    allProductsQuery[path] = value

    Object.keys(filters).forEach(key => {
        if(filters[key].length){
            if(key !== 'sizesAndStock'){
                let newQueryFilter = {}
                newQueryFilter[key] = { $in: filters[key] }
                query.$or.push(newQueryFilter) 
            } else {
                filters[key].forEach(size => {
                    let newQueryFilter = {}
                    newQueryFilter[key] = { $elemMatch: { size: size, stock: { $gt: 0 } } }
                    query.$or.push(newQueryFilter) 
                })
            }
        }
    })
    
    let aggregateSortResultsOptions = {
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
                aggregateSortResultsOptions[req.body.sortResults]
              ]
        )
        return products
    }

    const getAllProducts = async () => {
        let products = await Product.aggregate(
            [
                {
                  $match: allProductsQuery
                },
                aggregateSortResultsOptions[req.body.sortResults]
              ]
        )
        return products
    }

    const products = query.$or.length > 0 ? await getFilteredProducts() : await getAllProducts()

    res.json(products)
}