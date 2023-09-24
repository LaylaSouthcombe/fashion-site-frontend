import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"
import styled from "styled-components"

import Footer from "@/layout/Footer/Footer"
import Header from "@/layout/Header/Header"
import ProductsGrid from "@/components/ProductsGrid"

import {addFormattedQueryToProductQuery, addFormattedQueryToQueryConstraint} from '../../utils/mongoQueryGenerationUtils'

const PageContent = styled.div`
    flex-grow: 1;
`

export default function BrandPage({products, brand}){

    return (
        <>
            <Header/>
            <PageContent>
                {products?.length ? 
                    <ProductsGrid products={products} apiUrl={'/api/filtered/brand'} queryConstraint={{path: 'brand', value: brand}}/>
                : null}
            </PageContent>
            <Footer/>
        </>
    )
}

export async function getServerSideProps(context){
    await mongooseConnect()

    const {brand} = context.query

    let productQuery = {brand: brand}
    let queryConstraint = {brand: brand}

    if(brand !== 'all'){
        addFormattedQueryToProductQuery(brand, productQuery)
        addFormattedQueryToQueryConstraint(brand, queryConstraint)
    }

    let formattedBrand = brand.split("-b-")[1]

    const products = await Product.find(productQuery, null, {sort:{'_id': -1}})

    return {
        props:{
            products: JSON.parse(JSON.stringify(products)),
            brand: formattedBrand
    }}
}