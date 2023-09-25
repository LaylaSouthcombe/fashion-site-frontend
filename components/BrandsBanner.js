import styled from 'styled-components'
import Image from 'next/image'

import adidas from '../images/brandIcons/adidas.webp'
import nike from '../images/brandIcons/nike.webp'
import gucci from '../images/brandIcons/gucci.webp'
import essentials from '../images/brandIcons/essentials.webp'
import offwhite from '../images/brandIcons/offwhite.webp'
import northFace from '../images/brandIcons/northFace.webp'
import carhartt from '../images/brandIcons/carhartt.webp'
import acnestudios from '../images/brandIcons/acneStudios.webp'

const BrandsContainer = styled.div`
    width: 90%;
    margin: 40px auto;
    max-width: 1000px;
`

const BrandTitle = styled.h3`
    padding: 10px 40px;
    font-weight: normal;
    font-size: 1.25rem;
`

const BrandsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    row-gap: 25px;
    width: 100%;
    padding: 10px 20px;
    @media (min-width: 768px) {
        grid-template-columns: repeat(8, 1fr);
        padding: 20px;
    }
`

const BrandBox = styled.a`
    height: 50px;
    width: 80%;
    margin: 0 auto;
    padding: 5px;
    display: flex;
    justify-content: center;
    img {
        width: auto;
        height: 100%;
        max-width: 70px;
        object-fit: contain;
    }
`

export default function BrandsBanner(){
    const brands = [
        { url: '-b-adidas', image: adidas},
        { url: '-b-off-white', image: offwhite},
        { url: '-b-nike', image: nike},
        { url: '-b-essentials', image: essentials},
        { url: '-b-carhartt', image: carhartt},
        { url: '-b-gucci', image: gucci},
        { url: '-b-acne-studios', image: acnestudios},
        { url: '-b-north-face', image: northFace},
    ]

    return (
        <BrandsContainer>
            <BrandTitle>Brands</BrandTitle>
            <BrandsGrid>
                {brands.map((brand, i) => {
                    return (
                        <BrandBox key={"brand"+i} href={"brand/" + brand.url}>
                            <Image src={brand.image} alt={brand.url + " logo"}/>
                        </BrandBox>
                    )
                })}
            </BrandsGrid>
        </BrandsContainer>
    )
}