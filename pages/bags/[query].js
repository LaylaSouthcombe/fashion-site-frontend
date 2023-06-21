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

export default function BagsPage({products, queryConstraint}){

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
    let productQuery = {productCategory: 'Bags'}
    let queryConstraint = {productCategory: 'Bags'}
    const {query} = context.query

    if(query !== 'all'){
        addFormattedQueryToProductQuery(query, productQuery)
        addFormattedQueryToQueryConstraint(query, queryConstraint)
    }

    const products = await Product.find(productQuery, null, {sort:{'_id': -1}})

    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
            queryConstraint: queryConstraint
        }
    }
}