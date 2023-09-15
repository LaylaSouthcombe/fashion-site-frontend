import { mongooseConnect } from "@/lib/mongoose"
import { Account } from "@/models/Account"
import {Featured} from "@/models/Featured"
import { Order } from "@/models/Order"
import styled from "styled-components"

import Footer from "@/layout/Footer/Footer"
import Header from "@/layout/Header/Header"
import OrderTile from "@/components/OrderTile"

import BannerAdImage from "@/images/bannerAdImage.jpg"
import Link from "next/link"
import Image from "next/image"
import FeaturedProducts from "@/components/FeaturedProducts"

const PageContent = styled.div`
    flex-grow: 1;
`

const PastOrders = styled.div`
    width: 90%;
    max-width: 1000px;
    margin: 2rem auto 4rem auto;
`

const UserInfo = styled.div`
    width: 80%;
    max-width: 1200px;
    margin: 4rem auto 1rem auto;
    font-weight: bold;
    font-size: 1.5rem;
`

const NavigateButtons = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 1rem 0;
    a {
        text-decoration: none;
        border-radius: 5px;
        color: var(--main-light-blue);
        background-color: var(--main-dark-blue);
        padding: 0.5rem 0.65rem;
        margin: 0.2rem 0.2rem 0.2rem 0;
        font-size: 0.9rem;
    }
`

const FeaturedProductsSection = styled.div`
    width: 90%;
    max-width: 1200px;
    margin: 2rem auto 4rem auto;
`

const NoPastOrdersWrapper = styled.div`
    width: 80%;
    max-width: 1000px;
    margin: 2rem auto 4rem auto;
    display: flex;
    flex-direction: column;
    p {
        margin-bottom: 1rem;
    }
    @media (min-width: 786px) {
        flex-direction: row;
    }
`

const ThankYouImage = styled.div`
    width: 80%;
    margin: 0 auto;
    padding: 2rem;
    object-fit: contain;
    img {
        width: 100%;
        height: auto;
    }
    @media (min-width: 786px) {
        width: 30%;
        border-left: 2px solid var(--main-dark-blue);
    }
`

export default function AccountPage({account, orderHistory, featuredProducts}){

    return(
        <>
            <Header/>
            <PageContent>
                <UserInfo>
                    <p>Welcome to your account {account.firstName}</p>
                </UserInfo>
                {orderHistory.length ? 
                <>
                    <PastOrders>
                        <p>Your past orders</p>
                        {orderHistory.map((order, i) => (
                            <OrderTile order={order} key={i}/>
                        ))}
                    </PastOrders>
                </>
                : 
                <>
                    <NoPastOrdersWrapper>
                        <div>
                            <p>You have no past orders</p>
                            <p>Browse our collections to get the latest styles!</p>
                            <NavigateButtons>
                                <Link href="/clothing/all">Clothing</Link>
                                <Link href="/shoes/all">Shoes</Link>
                                <Link href="/bags/all">Bags</Link>
                                <Link href="/jewellery-watches/all">Jewellery & Watches</Link>
                                <Link href="/accessories/all">Accessories</Link>
                            </NavigateButtons>
                        </div>
                        <ThankYouImage>
                            <Image src={BannerAdImage} alt="Three males models sat on chairs"/>
                        </ThankYouImage>
                    </NoPastOrdersWrapper>
                    <FeaturedProductsSection>
                        <FeaturedProducts featuredProducts={featuredProducts}/>
                    </FeaturedProductsSection>
                </>
                }
            </PageContent>
            <Footer/>
        </>
    )
}

export async function getServerSideProps(context){
    await mongooseConnect()

    const {id} = context.query

    const account = await Account.findOne(
        { _id: id }
    )

    let orderQuery = {accountId: id}

    const orderHistory =  await Order.find(orderQuery)
    const featuredProducts = await Featured.find({})
    return {
        props: {
            account: JSON.parse(JSON.stringify(account)),
            orderHistory: JSON.parse(JSON.stringify(orderHistory)),
            featuredProducts: JSON.parse(JSON.stringify(featuredProducts))
        }
    }
}