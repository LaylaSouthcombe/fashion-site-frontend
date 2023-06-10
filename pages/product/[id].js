import Header from "@/layout/Header/Header"
import Footer from "@/layout/Footer/Footer"
import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"
import ProductImagesCarousel from "@/components/ProductImagesCarousel"
import mongoose from 'mongoose'
import ProductsCarousel from "@/components/ProductsCarousel/ProductsCarousel"
import styled from "styled-components"

const TopSectionContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 90%;
    margin: 0 auto;
`

const ProductInformationContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const MoreLikeThisTitle = styled.h2`
    text-align: center;
`
export default function ProductPage({product, moreLikeThisProducts}){
    console.log(moreLikeThisProducts)
    return (
        <>
            <Header/>
            <TopSectionContainer>
                <ProductImagesCarousel images={product.images}/>
                <ProductInformationContainer>
                    <h2>{product.name}</h2>
                    <p>{product.brand}</p>
                    <p>£{product.price}</p>

                </ProductInformationContainer>
            </TopSectionContainer>
                
                <p>{product.productSummary}</p>
                <MoreLikeThisTitle>Similar items</MoreLikeThisTitle>
                <ProductsCarousel products={moreLikeThisProducts}/>
            <Footer/>
        </>
    )
}

export async function getServerSideProps(context){
    await mongooseConnect()

    const {id} = context.query
    const product = await Product.findById(id)

    const moreLikeThisProducts = await Product.aggregate([
    {
        $search: {
          index: "default",
          compound: {
            must: [
                { 
                    moreLikeThis: {
                        like: {
                            name: product.name,
                            productSubType: product.productSubType
                        }
                    }
                }
            ],
            mustNot: [
                {
                    equals: {
                        path: "_id",
                        value: new mongoose.Types.ObjectId(id)
                    }
                }
            ]
          }
    }}, 
    { "$limit": 10}])
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
            moreLikeThisProducts: JSON.parse(JSON.stringify(moreLikeThisProducts))
        }
    }
}