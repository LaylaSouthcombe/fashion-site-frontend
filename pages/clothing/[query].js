import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"
import styled from "styled-components"

import {addFormattedQueryToProductQuery, addFormattedQueryToQueryConstraint} from '../../utils/mongoQueryGenerationUtils'

import Footer from "@/layout/Footer/Footer"
import Header from "@/layout/Header/Header"
import ProductsGrid from "@/components/ProductsGrid"

const PageContent = styled.div`
    flex-grow: 1;
`

export default function ClothingPage({products, queryConstraint}){

    return (
        <>
            <Header/>
            <PageContent>
                {products?.length ? 
                    <ProductsGrid products={products} apiUrl={'/api/filtered/categories'} queryConstraint={queryConstraint}/>
                : null}
            </PageContent>
            <Footer/>
        </>
    )
}

export async function getServerSideProps(context){
    await mongooseConnect()
    let productQuery = {productCategory: 'Clothing'}
    let queryConstraint = {productCategory: 'Clothing'}
    const {query} = context.query
    
    if(query !== 'all' && query !== 'popular' && query !== 'women' && query !== 'men'){
        addFormattedQueryToProductQuery(query, productQuery)
        addFormattedQueryToQueryConstraint(query, queryConstraint)
    }

    const getProducts = async (url) => {
        let products
        if(url === 'popular'){
            products = await Product.find(productQuery, null, {sort: { views: -1 }}).limit(200)
        } else if(url === 'women' || url === 'men'){
            productQuery["section"] = url[0].toUpperCase() + url.slice(1)
            products = await Product.find(productQuery, null, {sort:{views: -1}})
        } else {
            products = await Product.find(productQuery, null, {sort:{views: -1}})
        }
        return products
    }
    
    const products = await getProducts(query)
    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
            queryConstraint: queryConstraint
        }
    }
}