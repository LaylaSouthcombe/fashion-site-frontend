import { mongooseConnect } from "@/lib/mongoose"
import { Brand } from "@/models/Brand"
import styled from "styled-components"
import Link from "next/link"

import BannerAd from "@/components/BannerAd"
import Footer from "@/layout/Footer/Footer"
import Header from "@/layout/Header/Header"

const BrandsContainer = styled.section`
    width: 100%;
    padding: 0px 10%;
    margin-bottom: 3rem;
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

const BrandName = styled.p`
    margin: 0.5rem 0rem;
    a {
        text-decoration: none;
    }
`

export default function BrandsPage({brands}){

    return (
        <>
            <Header/>
            <BrandMainTitle>Brands</BrandMainTitle>
            <BrandsContainer>
                {Object.values(brands).map(brandObject => {
                    return (
                        <BrandLetterArea key={"brandArea-" + brandObject.letter}>
                            <BrandLetterTitle>{brandObject.letter}</BrandLetterTitle>
                            <div>
                                {brandObject.brands.map((brand, i) => {
                                    return (
                                        <BrandName key={`brandName-${brandObject.letter}-${i}`}>
                                            <Link href={"/brand/" + brand.link}>
                                            {brand.name}
                                            </Link>
                                        </BrandName>
                                    )
                                })}
                            </div>
                        </BrandLetterArea>
                    )
                })}
            </BrandsContainer>
            <BannerAd/>
            <Footer/>
        </>
    )
}

export async function getServerSideProps(){
    await mongooseConnect()
    const brands = await Brand.find({})

    return {
        props:{
            brands: JSON.parse(JSON.stringify(brands))
    }}
}