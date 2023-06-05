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
    console.log("queryConstraint", queryConstraint)
    console.log(filters)

    let path
    let value
    let combinedQuery = {$or: []}

    if(queryConstraint.path !== undefined){
        path = queryConstraint.path
        value = queryConstraint.value
        combinedQuery[path] = value
    }

    combinedQuery["productCategory"] = queryConstraint.productCategory
    
    
    const getQueryForAllProducts = () => {
        let allProductsQuery = {}
        if(queryConstraint.path !== undefined){
            allProductsQuery[path] = value
        }
        allProductsQuery["productCategory"] = queryConstraint.productCategory
        return allProductsQuery
    }
    
    let allProductsQuery = getQueryForAllProducts()

    Object.keys(filters).forEach(key => {
        if(filters[key].length){
            if(key !== 'sizesAndStock'){
                let newQueryFilter = {}
                let regexFilters = []
                filters[key].forEach(filter => {
                    regexFilters.push(new RegExp(filter, "i"))
                })
                newQueryFilter[key] = { $in: regexFilters }
                combinedQuery.$or.push(newQueryFilter) 
            } else {
                filters[key].forEach(size => {
                    let newQueryFilter = {}
                    newQueryFilter[key] = { $elemMatch: { size: size, stock: { $gt: 0 } } }
                    combinedQuery.$or.push(newQueryFilter) 
                })
            }
        }
    })
    console.log("combinedQuery", combinedQuery)
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
                  $match: combinedQuery
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

    const products = combinedQuery.$or.length > 0 ? await getFilteredProducts() : await getAllProducts()

    res.json(products)
}