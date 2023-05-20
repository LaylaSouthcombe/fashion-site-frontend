import styled from "styled-components"
import Image from "next/image"

import badge from '../images/experienceIcons/badge.png'
import deliveryTruck from '../images/experienceIcons/delivery-truck.png'
import order from '../images/experienceIcons/order.png'
import priceTag from '../images/experienceIcons/price-tag.png'

const ExperienceContainer = styled.div`
    width: 90%;
    margin: 40px auto;
    padding: 20px 0px;
`

const ExperienceTitle = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    padding: 15px;

    h3, p {
        padding: 5px 10px;
    }

    p {
        color: grey;
    }

    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;

        p {
            border-left: 2px solid black;
        }
    }

`

const ExperienceGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;

    @media (min-width: 768px) {
        grid-template-columns: repeat(4, 1fr);
    }
`

const ExperienceBox = styled.div`
    padding: 20px;
    img {
        width: 15%;
        height: auto;
        background-color: grey;
        padding: 10px;
        border-radius: 5px;
    }

    h3 {
        font-size: 1rem;
        padding: 7.5px 0px;
    }

    p {
        color: grey;
        font-size: 0.85rem;
    }

    @media (min-width: 768px) {
        img {
            width: 22%;
            padding: 8px;
        }
    }
`

export default function CustomerExperience(){

    const experienceInfo = [
        {icon: priceTag, title: 'Popular Brands', text: 'Our collections contain products from well-known brands'},
        {icon: badge, title: 'Satisfaction Guaranteed', text: 'Exchange a product you\'ve purchased if you are not happy'},
        {icon: order, title: 'New Arrivals Everyday', text: 'We keep our collections up to date with fashion trends'},
        {icon: deliveryTruck, title: 'Fast & Free Shipping', text: 'We offer fast and free shipping for loyal customers'}
    ]

    return (
        <>
            <ExperienceContainer>
                <ExperienceTitle>
                    <h3>We provide the best customer experiences</h3>
                    <p>We ensure our customers have the best shopping experience</p>
                </ExperienceTitle>
                <ExperienceGrid>
                    {experienceInfo.map((info, i) => {
                        return (
                            <>
                                <ExperienceBox key={"info"+i}>
                                    <Image src={info.icon} alt={info.title[0]+" icon"}/>
                                    <h3>{info.title}</h3>
                                    <p>{info.text}</p>
                                </ExperienceBox>
                            </>
                        )
                    })}
                </ExperienceGrid>
            </ExperienceContainer>
        </>
    )
}