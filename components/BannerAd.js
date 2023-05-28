import BannerAdImage from "@/images/bannerAdImage.jpg"
import Image from "next/image"
import styled from "styled-components"

const BannerAdContainer = styled.div`
    width: 80%;
    margin: 5rem auto;
    display: grid;
    grid-template-columns: 1fr;
    background-color: var(--main-dark-blue);
    border-radius: 10px;
    height: fit-content;
    @media (min-width: 768px) {
        width: 85%;
        grid-template-columns: 0.45fr 0.45fr;
    }
    @media (min-width: 950px) {
        width: 85%;
        grid-template-columns: 0.4fr 0.6fr;
    }
`

const BannerImage = styled.div`
    display: flex;
    img {
        width: 100%;
        height: auto;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        object-fit: cover;
        @media (min-width: 768px) {
            grid-template-columns: 0.4fr 0.6fr;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            border-top-right-radius: 0px;
            border-bottom-right-radius: 0px;
        }
    }
`

const BannerTextArea = styled.div`
    padding: 1.5rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const SmallBannerText = styled.p`
    text-transform: uppercase;
    font-size: 0.75rem;
    color: white;
`

const LargeBannerText = styled.h2`
    font-weight: bold;
    font-size: 2.25rem;
    padding: 1rem 0;
    color: white;
    @media (min-width: 768px) {
        font-size: 1.5rem;
    }
    @media (min-width: 950px) {
        font-size: 2.25rem;
    }
`

const ShopTheSaleButton = styled.button`
    background-color: white;
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-radius: 5px;
    outline: none;
    border: none;
    margin-top: 0.5rem;
    width: fit-content;
`

export default function BannerAd() {
    return(
        <BannerAdContainer>
            <BannerImage>
                <Image src={BannerAdImage} alt="Three males models sat on chairs"/>
            </BannerImage>
            <BannerTextArea>
                <SmallBannerText>LIMITED OFFER</SmallBannerText>
                <LargeBannerText>35% off this Friday only, plus get a free gift</LargeBannerText>
                <ShopTheSaleButton>Shop the sale</ShopTheSaleButton>
            </BannerTextArea>
        </BannerAdContainer>
    )
}