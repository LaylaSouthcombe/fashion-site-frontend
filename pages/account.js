import Header from "@/layout/Header/Header"
import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"
import ProductsGrid from "@/components/ProductsGrid"

export default function AccountPage({products}){
    console.log({products})
    return(
        <>
        {products?.length ? 
        <ProductsGrid products={products}/>
        : null
        }
        </>
    )
}

export async function getServerSideProps(){
    await mongooseConnect()
    const products = await Product.find({}, null, {sort:{'_id': -1}})
    console.log("products", products)
    return {
        props:{
            products: JSON.parse(JSON.stringify(products))
    }}
}