import Header from "@/layout/Header/Header"
import Footer from "@/layout/Footer/Footer"
import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"
import ProductsGrid from "@/components/ProductsGrid"

export default function BrandPage({products}){
    // console.log({products})
    return(
        <>
        <Header/>
        {products?.length ? 
        <ProductsGrid products={products}/>
        : null
        }
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
    }])
    console.log("products", products.length)
    return {
        props:{
            products: JSON.parse(JSON.stringify(products))
    }}
}