import styled from 'styled-components'
import HomeHeroImage from '../images/HomeHeroImage.png'
import HomeHeroImageSmall from '../images/HomeHeroImageSmall.png'
import Image from 'next/image'
import Link from 'next/link'
import arrow from '../images/curatedPicks/right-arrow.png'
import { useState } from 'react'

const HeroImageDiv = styled.div`
    position: relative;
    width: 100%;
    object-fit: contain;
    overflow: hidden;
    img {
        width: 100%;
        height: auto;
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
        top: 25%;
    }
`

const HeroText = styled.h1`
    color: var(--main-light-blue);
    text-align: center;
    font-size: 1rem;
    max-width: 500px;
    margin: 0 auto;
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

export default function HomeHero() {

    const [windowSize, setWindowSize] = useState(window.innerWidth)

    const handleResize = () => {
        setWindowSize(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return (
        <HeroImageDiv>
            <Image src={windowSize > 768 ? HomeHeroImage : HomeHeroImageSmall} alt="" />
            <HeroInfo>
                <HeroText>Level up your style with out summer collections</HeroText>
                <HeroButton href={"clothing"}>Shop now<Image src={arrow} alt="arrow"/></HeroButton>
            </HeroInfo>
        </HeroImageDiv>
    )
}