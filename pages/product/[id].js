import Header from "@/layout/Header/Header"
import Footer from "@/layout/Footer/Footer"
import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"
import ProductImagesCarousel from "@/components/ProductImagesCarousel"
import mongoose from 'mongoose'
import ProductsCarousel from "@/components/ProductsCarousel/ProductsCarousel"
import styled from "styled-components"
import { useState } from "react"

const ProductPathway = styled.p`
    width: 90%;
    margin: 0 auto;
    padding: 0.5rem;
`

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

const SizeButtons = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const SizeButton = styled.button`
    width: fit-content;
    background-color: ${props => props.isActive ? 'var(--main-dark-blue)' : 'var(--main-light-blue)'};
    color: ${props => props.isActive ? 'var(--main-light-blue)' : 'var(--main-dark-blue)'};
    padding: 0.5rem 1rem;
    margin: 0.25rem;
    border-radius: 2.5px;
    font-size: 0.9rem;
    cursor: pointer;
    outline: none;
    border: none;

    :hover:enabled {
        background-color:  ${props => props.isActive ? 'var(--main-dark-blue)' : 'var(--main-lightish-blue)'};
    }
    
    :disabled {
        opacity: 0.5;
    }
`

const LastStockLeftPara = styled.div`
    height: 1.75rem;
    padding: 0.5rem;
    span {
        font-size: 0.8rem;
    }

    span:first-child{
        font-weight: bold;
    }
`

export default function ProductPage({product, moreLikeThisProducts}){
    console.log(product)

    const getFirstInStockSize = (product) => {
        let firstStockInSize
        for(let i = 0; i < product.sizesAndStock.length; i++){
            if(product.sizesAndStock[i].stock !== 0 && firstStockInSize === undefined){
                firstStockInSize = product.sizesAndStock[i]
            }
        }
        return firstStockInSize
    }

    const [selectedSize, setSelectedSize] = useState(getFirstInStockSize(product))

    return (
        <>
            <Header/>
            <ProductPathway>{product.productCategory} &gt; {product.productType}</ProductPathway>
            <TopSectionContainer>
                <ProductImagesCarousel images={product.images}/>
                <ProductInformationContainer>
                    <h2>{product.name}</h2>
                    <p>{product.brand}</p>
                    <p>£{product.price}</p>
                    <SizeButtons>
                        {product.sizesAndStock.map((sizeObject, i) => {
                            const isActive = selectedSize.size === sizeObject.size
                            return (
                                    <SizeButton key={"sizeObject" + i} isActive={isActive} onClick={() => setSelectedSize(sizeObject)} disabled={sizeObject.stock === 0}>{sizeObject.size}</SizeButton>
                            )
                        })}
                    </SizeButtons>
                    <LastStockLeftPara>
                        {selectedSize.stock === 1 ? 
                        <>
                            <span>Last 1 left</span>
                            <span> - make it yours!</span>
                        </>
                        : null}
                    </LastStockLeftPara>
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