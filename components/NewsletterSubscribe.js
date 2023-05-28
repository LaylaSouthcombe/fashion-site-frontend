import styled from "styled-components"
import emailIcon from '../images/icons/mail.png'
import Image from "next/image"

const SubscribeContainer = styled.div`
    width: 65%;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const SubscribeLargeText = styled.h2`
    font-size: 1.75rem;
    font-weight: bold;
    margin-bottom: 1rem;
`

const SmallSubscribeText = styled.h3`
    font-size: 0.9rem;
    color: grey;
    font-weight: normal;
    margin-bottom: 0.5rem;
`

const SubscribeInputArea = styled.div`
    display: flex;
    justify-content: center;
    margin: 1rem;
    position: relative;
    width: fit-content;
`

const SubscribeEmailInput = styled.input`
    outline: #f2f3f5;
    border: 2px solid #dee1e3;
    background: #f2f3f5;
    padding: 5px 10px;
    font-size: 1rem;
    margin-right: 0.25rem;
    width: 20rem;
    border-radius: 0.4rem;
    text-indent: 25px;
    
    ::placeholder {
        opacity: 0.5;
        font-weight: bold;
        font-size: 0.9rem;
    }
`

const PlaceholderEmailIcon = styled.span`
    position: absolute;
    left: 10px;
    top: 35%;
    width: 20px;
    height: 20px;
    img {
        width: 100%;
        height: auto;
    }
`

const SubscribeButton = styled.button`
    border: none;
    padding: 1rem 1.4rem;
    border-radius: 0.4rem;
    background-color: var(--main-dark-blue);
    color: white;
    font-size: 1rem;
`

const SubscribeTerms = styled.p`
    font-size: 0.75rem;
    color: grey;
`

export default function NewsletterSubscribe() {
    return (
        <SubscribeContainer>
            <SubscribeLargeText>Subscribe to our newsletter to get updates on our latest collections</SubscribeLargeText>
            <SmallSubscribeText>Get 20% off your first order by subscribing to our newsletter</SmallSubscribeText>
            <SubscribeInputArea>
                <SubscribeEmailInput placeholder=" Enter your email"/>
                <PlaceholderEmailIcon><Image src={emailIcon} alt="email icon"/></PlaceholderEmailIcon>
                <SubscribeButton>Subscribe</SubscribeButton>
            </SubscribeInputArea>
            <SubscribeTerms>You are able to unsubscribe at any time</SubscribeTerms>
        </SubscribeContainer>
    )
}