import styled from "styled-components"
import Image from "next/image"

import casual from '../images/curatedPicks/casual.jpg'
import men from '../images/curatedPicks/men.jpg'
import popular from '../images/curatedPicks/popular.jpg'
import women from '../images/curatedPicks/women.jpg'
import arrow from '../images/curatedPicks/right-arrow.png'
import Link from "next/link"

const CuratedContainer = styled.div`
    width: 90%;
    margin: 40px auto;
    padding: 20px 0px;
    max-width: 1000px;
`

const CuratedTitle = styled.div`
    padding: 15px;
    h3 {
        padding: 5px 10px;
    }
`

const CuratedGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    @media (min-width: 768px) {
        grid-template-columns: repeat(4, 1fr);
    }
`

const CuratedBox = styled.div`
    position: relative;
    padding: 20px;
    img {
        width: 100%;
        height: auto;
        border-radius: 5px;
    }

    @media (min-width: 768px) {
        /* img {
            width: 22%;
            padding: 8px;
        } */
    }
`
const CuratedLink = styled(Link)`
    position: absolute;
    bottom: 10%;
    left: 10%;
    padding: 10px 15px;
    margin: 15px;
    border-radius: 10px;
    background-color: white;
    font-size: 0.85rem;
    text-decoration: none;
    color: black;
    width: 65%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
        width: 12.5%;
    }
    @media (min-width: 768px) {
        font-size: 0.65rem;
    }
    @media (min-width: 860px) {
        font-size: 0.75rem;
    }
    @media (min-width: 860px) {
        font-size: 0.85rem;
    }
`

export default function CuratedPicks() {

    const picksInfo = [
        {url: '/popular', image: popular, title: 'Best Sellers'},
        {url: '/men', image: men, title: 'Shop Men'},
        {url: '/women', image: women, title: 'Shop Women'},
        {url: '/casual', image: casual, title: 'Shop Casual'}
    ]

    return (
        <CuratedContainer>
            <CuratedTitle>
                <h3>Curated Picks</h3>
            </CuratedTitle>
            <CuratedGrid>
                {picksInfo.map((pick, i) => {
                    return (
                        <CuratedBox key={"pick"+i}>
                            <Image src={pick.image} alt={pick.title[1]+ " image"}/>
                            <CuratedLink href={"clothing"+pick.url}>{pick.title}<Image src={arrow} alt="arrow"/></CuratedLink>
                        </CuratedBox>
                    )
                })}
            </CuratedGrid>
        </CuratedContainer>
    )
}