import Header from "@/layout/Header/Header"
import Footer from "@/layout/Footer/Footer"
import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"
import ProductImagesCarousel from "@/components/ProductImagesCarousel"
import mongoose from 'mongoose'
import ProductsCarousel from "@/components/ProductsCarousel/ProductsCarousel"
import styled from "styled-components"
import { useState } from "react"
import AddToCartBtn from "@/components/AddToCartBtn"
import PlusSign from "../../images/icons/plus.png"
import MinusSign from "../../images/icons/minus.png"
import Image from "next/image"

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

const AddProductToCartArea = styled.div`
    display: flex;
    align-items: center;
`

const CounterArea = styled.div`
    border: 1px solid var(--main-light-blue);
    padding: 0.45rem 0.8rem;
    margin: 0.5rem 0.8rem 0.5rem 0.5rem;
    display: flex;
    border-radius: 5px;
    button {
        padding: 0.25rem;
        border: none;
        background-color: white;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        img {
            width: 0.7rem;
            height: auto;
        }
    }

    span {
        margin: 0rem 0.75rem;
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
    const [numberOfSelectedStock, setNumberOfSelectedStock] = useState(1)

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
                    {product.productCategory === "Clothing" || product.productCategory === "Shoes" ?
                    <>
                        <SizeButtons>
                            { product.sizesAndStock.map((sizeObject, i) => {
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
                    </>
                    : null
                    }
                    <AddProductToCartArea>
                        <CounterArea>
                            <button onClick={(() => numberOfSelectedStock > 1 ? setNumberOfSelectedStock(prev => prev - 1) : null)}>
                                <Image src={MinusSign}/>
                            </button>
                            <span>{numberOfSelectedStock}</span>
                            <button onClick={(() => setNumberOfSelectedStock(prev => prev + 1))}>
                                <Image src={PlusSign}/>
                            </button>
                        </CounterArea>
                            <AddToCartBtn productSizeQuantity={{id: product._id, size: selectedSize.size, quantity: numberOfSelectedStock}}/>
                    </AddProductToCartArea>
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