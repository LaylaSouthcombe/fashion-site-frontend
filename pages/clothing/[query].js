import Header from "@/layout/Header/Header"
import Footer from "@/layout/Footer/Footer"
import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"
import ProductsGrid from "@/components/ProductsGrid"
import styled from "styled-components"

const PageContent = styled.div`
    flex-grow: 1;
`

export default function ClothingPage({products, queryConstraint}){

    return(
        <>
        <Header/>
        <PageContent>
        {products?.length ? 
            <ProductsGrid products={products} apiUrl={'/api/filtered/categories'} queryConstraint={queryConstraint}/>
            : null
        }
        </PageContent>
        <Footer/>
        </>
    )
}

export async function getServerSideProps(context){
    await mongooseConnect()
    let productQuery = {}
    let queryConstraint = {}
    const {query} = context.query

    if(query.includes("-s-")){
        productQuery[productSubType] = query.split("-s-")[1]
        queryConstraint[path] = 'productSubType'
        queryConstraint[value] = query.split("-s-")[1]
    } else if(query.includes("-t-")){
        productQuery[productType] = query.split("-t-")[1]
        queryConstraint[path] = 'productType'
        queryConstraint[value] = query.split("-t-")[1]
    }

    const products = await Product.find(productQuery, null, {sort:{'_id': -1}})

    console.log("products", products.length)
    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
            queryConstraint: queryConstraint
        }
    }
}