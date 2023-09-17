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

    let path
    let value
    let combinedQuery = {$or: []}

    if(queryConstraint.path !== undefined){
        path = queryConstraint.path
        value = queryConstraint.value
        combinedQuery[path] = value
    }

    let formattedProductCategory = queryConstraint.productCategory
    combinedQuery["productCategory"] = formattedProductCategory
    
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
                    newQueryFilter[key] = { $elemMatch: { size: new RegExp(size, "i"), stock: { $gt: 0 } } }
                    combinedQuery.$or.push(newQueryFilter) 
                })
            }
        }
    })

    let aggregateSortResultsOptions = {
        recommended: { $sort : { views : -1 } },
        lowestPrice: { $sort : { price : 1 } },
        highestPrice: { $sort : { price : -1 } },
        newIn: { $sort : { _id : -1 } }
    }

//TODO: add 0 results
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