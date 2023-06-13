import styled from 'styled-components'
import Image from 'next/image'

import adidas from '../images/brandIcons/adidas.png'
import nike from '../images/brandIcons/nike.png'
import gucci from '../images/brandIcons/gucci.png'
import essentials from '../images/brandIcons/essentials.png'
import offwhite from '../images/brandIcons/offwhite.png'
import northFace from '../images/brandIcons/northFace.png'
import carhartt from '../images/brandIcons/carhartt.png'
import acnestudios from '../images/brandIcons/acnestudios.png'

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
        { url: 'adidas', image: adidas},
        { url: 'offwhite', image: offwhite},
        { url: 'nike', image: nike},
        { url: 'essentials', image: essentials},
        { url: 'carhartt', image: carhartt},
        { url: 'gucci', image: gucci},
        { url: 'acnestudios', image: acnestudios},
        { url: 'north-face', image: northFace},
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