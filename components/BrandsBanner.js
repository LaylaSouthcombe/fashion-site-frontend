import styled from 'styled-components'
import adidas from '../images/brandIcons/adidas.png'
import calvinKlein from '../images/brandIcons/calvinKlein.png'
import chanel from '../images/brandIcons/chanel.png'
import essentials from '../images/brandIcons/essentials.png'
import guess from '../images/brandIcons/guess.png'
import northFace from '../images/brandIcons/northFace.png'
import palace from '../images/brandIcons/palace.png'
import supreme from '../images/brandIcons/supreme.png'

import Image from 'next/image'
export default function BrandsBanner(){
    const brands = [
        { url: 'adidas', image: adidas},
        { url: 'calvin-klein', image: calvinKlein},
        { url: 'chanel', image: chanel},
        { url: 'essentials', image: essentials},
        { url: 'guess', image: guess},
        { url: 'north-face', image: northFace},
        { url: 'palace', image: palace},
        { url: 'supreme', image: supreme}
    ]

    const BrandsContainer = styled.div`
        width: 90%;
        margin: 40px auto;
    `
    const BrandTitle = styled.h3`
        padding: 10px 40px;
        font-weight: normal;
        font-size: 1.25rem;
    `

    const BrandsGrid = styled.div`
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        width: 100%;
        padding: 20px;
    `

    const BrandBox = styled.a`
        height: 50px;
        width: 80%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        img {
                width: auto;
                height: 100%;
        }
    `

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