import Header from "@/layout/Header/Header"
import Footer from "@/layout/Footer/Footer"
import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"
import ProductsGrid from "@/components/ProductsGrid"
import styled from "styled-components"

const PageContent = styled.div`
    flex-grow: 1;
`

export default function BrandPage({products, brand}){
    // console.log({products})
    return(
        <>
            <Header/>
            <PageContent>
                {products?.length ? 
                <ProductsGrid products={products} apiUrl={'/api/filtered/brand'} queryConstraint={{path: 'brand', value: brand.toUpperCase()}}/>
                : null
                }
            </PageContent>
            <Footer/>
        </>
    )
}

export async function getServerSideProps(context){
    await mongooseConnect()
    const {brand} = context.query

    const products = await Product.aggregate([{
        $search: {
          index: "default",
          text: {
            query: brand.replace("-", " "),
            path: 'brand'
          }
        }
    }]).limit(50)
    console.log("products", products.length)
    return {
        props:{
            products: JSON.parse(JSON.stringify(products)),
            brand: brand
    }}
}