import styled from "styled-components"
import Image from "next/image"

import Mastercard from '../../images/logos/mastercard.png'
import Paypal from '../../images/logos/paypal.png'
import RuneLogoImg from '../../images/logos/runeLogo.png'
import Visa from '../../images/logos/visa.png'

const FooterOuterContainer = styled.footer`
    position: relative;
    padding: 2rem 2rem 0 2rem;
    width: 100%;
    margin-top: auto;
    background-color: var(--main-light-blue);
    align-self: center;
    @media (min-width: 500px) {
        padding: 3rem 3rem 0 3rem;
    }
`

const FooterContainer = styled.section`
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    padding-bottom: 2rem;
    @media (min-width: 768px) {
        grid-template-columns: 0.8fr 1.2fr;
        padding-bottom: 1rem;
    }
`

const RuneLogoArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 2rem;
    width: 75%;
`

const RuneLogo = styled.div`
    width: 5rem;
    img {
        width: 100%;
        height: auto;
    }
`

const FooterTitle = styled.p`
    font-size: 0.85rem;
    text-transform: uppercase;
    padding-bottom: 0.5rem;
    font-weight: bold;
`

const FooterText = styled.p`
    font-size: 0.75rem;
    padding: 0.35rem 0;
    color: var(--main-blue);
`

const FooterInfoSection = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    @media (min-width: 768px) {
        grid-template-columns: 2fr 1fr;
    }
`

const FooterLinks = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding-bottom: 2rem;
    @media (min-width: 768px) {
        padding-bottom: 1rem;
    }
`

const FooterPayments = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    img {
        width: 50%;
        max-width: 60px;
        height: auto;
        margin: 0 auto;
    }
    @media (min-width: 768px) {
        img {
            margin: 0;
            width: 70%;
            max-width: 80px;
        }
    }
`

const FooterLine = styled.div`
    width: 90%;
    height: 2px;
    background-color: var(--main-blue);;
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
`

const FooterCopyRight = styled.div`
    width: 100%;
    text-align: center;
    padding: 1.5rem;
    font-size: 0.75rem;
    color: var(--main-blue);
`

export default function Footer() {

    return (
        <>
            <FooterOuterContainer>
                <FooterContainer>
                    <RuneLogoArea>
                        <RuneLogo>
                            <Image src={RuneLogoImg} alt="Rune logo"/>
                        </RuneLogo>
                        <FooterText>Specializes in providing high-quality, stylish products for your wardrobe</FooterText>
                    </RuneLogoArea>
                    <FooterInfoSection>
                        <FooterLinks>
                            <div>
                                <FooterTitle>SHOP</FooterTitle>
                                <FooterText>All Collections</FooterText>
                                <FooterText>Winter Edition</FooterText>
                                <FooterText>Sale</FooterText>
                            </div>
                            <div>
                                <FooterTitle>COMPANY</FooterTitle>
                                <FooterText>About Us</FooterText>
                                <FooterText>Contact</FooterText>
                                <FooterText>Affiliates</FooterText>
                            </div>
                            <div>
                                <FooterTitle>SUPPORT</FooterTitle>
                                <FooterText>FAQs</FooterText>
                                <FooterText>Cookie Policy</FooterText>
                                <FooterText>Terms of Use</FooterText>
                            </div>
                        </FooterLinks>
                        <div>
                            <FooterTitle>PAYMENT METHODS</FooterTitle>
                            <FooterPayments>
                                <Image src={Mastercard} alt="mastercard logo"/>
                                <Image src={Visa} alt="visa logo"/>
                                <Image src={Paypal} alt="paypal logo"/>
                            </FooterPayments>
                        </div>
                    </FooterInfoSection>
                </FooterContainer>
                <FooterLine></FooterLine>
                <FooterCopyRight>Copyright @2023 Rune. All rights reserved</FooterCopyRight>
            </FooterOuterContainer>
        </>
    )
}