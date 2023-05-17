import styled from 'styled-components'
import HomeHeroImage from '../images/HomeHeroImage.jpeg'
import Image from 'next/image'

const HeroImageDiv = styled.div`
    width: 100%;
    height: 40vh;
    object-fit: contain;
    overflow: hidden;
    img {
        width: 100%;
    }
`

export default function HomeHero() {
    return (
        <HeroImageDiv>
            <Image src={HomeHeroImage} alt="" />
        </HeroImageDiv>
    )
}