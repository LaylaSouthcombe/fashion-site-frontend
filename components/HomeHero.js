import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'

import Arrow from '../images/curatedPicks/right-arrow.webp'
import Model1 from '../images/heroImages/model-1.webp'
import Model2 from '../images/heroImages/model-2.webp'
import Model3 from '../images/heroImages/model-3.webp'

const HeroImageDiv = styled.div`
    position: relative;
    width: 100%;
    max-width: 1400px;
    overflow: hidden;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 400px;
    text-align: center;
    justify-content: center;
    img {
        width: 100%;
        height: auto;
        vertical-align: middle;
    }
    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
`

const HeroInfo = styled.div`
    position: absolute;
    top: 15%;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
    @media (min-width: 370px) {
        top: 20%;
    }
    @media (min-width: 500px) {
        top: 35%;
    }
`

const HeroText = styled.h1`
    color: var(--main-light-blue);
    text-align: center;
    font-size: 1rem;
    max-width: 500px;
    margin: 0 auto;
    text-shadow:
                -0.75px -0.75px 0 var(--main-dark-blue),
                0.75px -0.75px 0 var(--main-dark-blue),
                -0.75px 0.75px 0 var(--main-dark-blue),
                0.75px 0.75px 0 var(--main-dark-blue);
    @media (min-width: 400px) {
        font-size: 1.25rem;
    }
    @media (min-width: 500px) {
        font-size: 1.5rem;
    }
`

const HeroButton = styled(Link)`
    padding: 0.35rem 0.75rem;
    margin: 0.65rem auto 0 auto;
    border-radius: 5px;
    background-color: white;
    font-size: 0.7rem;
    text-decoration: none;
    color: var(--main-dark-blue);
    width: 5.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
        width: 12.5%;
    }
    @media (min-width: 300px) {
        margin: 1rem auto 0 auto;
    }
    @media (min-width: 500px) {
        font-size: 0.8rem;
        width: 7rem;
        padding: 0.5rem 1rem;
        margin: 2rem auto 0 auto;
        border-radius: 10px;
    }
    @media (min-width: 768px) {
        font-size: 1rem;
        padding: 0.75rem 1.25rem;
        width: 10rem;
    }
    @media (min-width: 950px) {
        font-size: 1rem;
        padding: 1rem 1.5rem;
    }
`

const HeroImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    max-height: 100%;

    display: ${props => props.mobile === true ? 'inline-block' : 'none'};
    
    @media (min-width: 768px) {
        display: inline-block;
    }

    img {
        max-width: 100%;
        height: 100%;
        width: auto;
        object-fit: cover;
        object-position: center;
        overflow: clip;
    }
`

export default function HomeHero() {

    return (
        <HeroImageDiv>
            <HeroImage mobile={true}>
                <Image src={Model1} priority alt="Female clothing model"/>
            </HeroImage>
            <HeroImage mobile={false}>
                <Image src={Model3} priority alt="Female clothing model"/>
            </HeroImage>
            <HeroImage mobile={true}>
                <Image src={Model2} priority alt="Male clothing model"/>
            </HeroImage>
            <HeroInfo>
                <HeroText>Level up your style with out summer collections</HeroText>
                <HeroButton href={"clothing/all"}>Shop now<Image src={Arrow} alt="arrow"/></HeroButton>
            </HeroInfo>
        </HeroImageDiv>
    )
}