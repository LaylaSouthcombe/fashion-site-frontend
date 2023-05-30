import Header from "@/layout/Header/Header"
import Footer from "@/layout/Footer/Footer"
import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"
import ProductsGrid from "@/components/ProductsGrid"
import { useState, useEffect } from "react"
import styled from "styled-components"
import Link from "next/link"


const BrandsContainer = styled.section`
    width: 100%;
    padding: 0px 10%;
    background-color: var(--main-light-blue);
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    @media (min-width: 500px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }
`

const BrandMainTitle = styled.h2`
    background-color: var(--main-light-blue);
    padding: 2rem 10% 2rem 10%;
`

const BrandLetterArea = styled.div`
    padding-bottom: 2rem;
    border-top: 2px solid var(--main-lightish-blue);
    :nth-child(1) {
        border-top: none;
    }
    @media (min-width: 500px) {
        grid-template-columns: repeat(2, 1fr);
        :nth-child(2) {
            border-top: none;
        }
    }
    @media (min-width: 768px) {
        :nth-child(3) {
            border-top: none;
        }
    }
`

const BrandLetterTitle = styled.h3`
    padding: 0.75rem 0rem 0.25rem 0rem;
`

const BrandNamesContainer = styled.div`

`

const BrandName = styled.p`
    margin: 0.5rem 0rem;
    a {
        text-decoration: none;
    }
`

export default function BrandsPage({products}){

    const [brands, setBrands] = useState([])
    const [brandsLoaded, setBrandsLoaded] = useState(false)

    const getBrands = (allProducts) => {
        let brandsList = []
        for(let i = 0; i < allProducts.length; i++){
            if(!brandsList.includes(allProducts[i].brand)){
                brandsList.push(allProducts[i].brand)
            }
        }
        return brandsList.sort()
    }

    const getBrandObject = (allBrands) => {
        let brandsObject = {}
        for(let i = 0; i < allBrands.length; i++){
            let letter = allBrands[i][0]
            let link = allBrands[i].replace(" ", "-").toLowerCase()
            if(!Object.keys(brandsObject).includes(allBrands[i][0])){
                brandsObject[letter] = []
                brandsObject[letter].push({name: allBrands[i], link: link})
            } else {
                brandsObject[letter].push({name: allBrands[i], link: link})
            }
        }
        return brandsObject
    }

    const getBrandsList = (products) => {
        let brandsList = getBrands(products)
        let brandsObject = getBrandObject(brandsList)
        setBrands(brandsObject)
    }

    useEffect(() => {
        if(products !== undefined){
            getBrandsList(products)
        }
        setBrandsLoaded(true)
    },[])
    return (
        <>
            <BrandMainTitle>Brands</BrandMainTitle>
            <BrandsContainer>
                {brandsLoaded ? 
                    Object.keys(brands).map(brandLetter => {
                        return (
                            <BrandLetterArea key={"brandArea-" + brandLetter}>
                                <BrandLetterTitle>{brandLetter}</BrandLetterTitle>
                                <BrandNamesContainer>
                                    {brands[brandLetter].map((brand, i) => {
                                        return (
                                            <BrandName key={`brandName-${brandLetter}-${i}`}>
                                                <Link href={brand.link}>
                                                {brand.name}
                                                </Link>
                                            </BrandName>
                                        )
                                    })}
                                </BrandNamesContainer>
                            </BrandLetterArea>
                        )
                    })
                : null}
            </BrandsContainer>
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