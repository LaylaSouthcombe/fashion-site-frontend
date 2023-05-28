import styled from "styled-components"
import RuneLogoImg from '../../images/logos/runeLogo.png'
import Mastercard from '../../images/logos/mastercard.png'
import Visa from '../../images/logos/visa.png'
import Paypal from '../../images/logos/paypal.png'
import Image from "next/image"

const FooterOuterContainer = styled.div`
    position: relative;
    padding: 3rem 3rem 0 3rem;
    margin-top: 4rem;
    background-color: var(--main-light-blue);
`

const FooterContainer = styled.section`
    width: 100%;
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
    /* padding: 0 0 2rem 2rem; */
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

const FooterLinkColumn = styled.div`
    /* margin: 0.25rem; */
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
                        <Image src={RuneLogoImg}/>
                    </RuneLogo>
                    <FooterText>Specializes in providing high-quality, stylish products for your wardrobe</FooterText>
                </RuneLogoArea>
                <FooterInfoSection>
                    <FooterLinks>
                        <FooterLinkColumn>
                            <FooterTitle>SHOP</FooterTitle>
                            <FooterText>All Collections</FooterText>
                            <FooterText>Winter Edition</FooterText>
                            <FooterText>Sale</FooterText>
                        </FooterLinkColumn>
                        <FooterLinkColumn>
                            <FooterTitle>COMPANY</FooterTitle>
                            <FooterText>About Us</FooterText>
                            <FooterText>Contact</FooterText>
                            <FooterText>Affiliates</FooterText>
                        </FooterLinkColumn>
                        <FooterLinkColumn>
                            <FooterTitle>SUPPORT</FooterTitle>
                            <FooterText>FAQs</FooterText>
                            <FooterText>Cookie Policy</FooterText>
                            <FooterText>Terms of Use</FooterText>
                        </FooterLinkColumn>
                    </FooterLinks>
                    <div>
                        <FooterTitle>PAYMENT METHODS</FooterTitle>
                        <FooterPayments>
                            <Image src={Mastercard}/>
                            <Image src={Visa}/>
                            <Image src={Paypal}/>
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