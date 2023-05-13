import Header from "@/layout/Header/Header"
import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"
import ProductImagesCarousel from "@/components/ProductImagesCarousel"

export default function ProductPage({product}){
    console.log(product)
    return (
        <>
            <Header/>
            <h1>{product.name}</h1>
            <p>{product.price}</p>
            <ProductImagesCarousel images={product.images}/>
            <p>{product.brand}</p>
            <p>{product.productSummary}</p>
            <p>{product.name}</p>
        </>
    )
}

export async function getServerSideProps(context){
    await mongooseConnect()
    console.log({query: context.query})
    const {id} = context.query
    const product = await Product.findById(id)
    return {
        props: {
            product: JSON.parse(JSON.stringify(product))
        }
    }
}