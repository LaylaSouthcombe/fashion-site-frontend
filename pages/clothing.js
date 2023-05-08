import Header from "@/layout/Header/Header"
import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"

export default function ClothingPage({products}){
    console.log({products})
    return(
        <Header/>
    )
}

export async function getServerSideProps(){
    await mongooseConnect()
    const products = await Product.find({}, null, {sort:{'_id': -1}})
    console.log(products)
    return {
        props:{
            products: JSON.parse(JSON.stringify(products))
    }}
}