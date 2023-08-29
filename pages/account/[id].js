import { mongooseConnect } from "@/lib/mongoose"
import { Account } from "@/models/Account"
import {Featured} from "@/models/Featured"
import { Order } from "@/models/Order"
import styled from "styled-components"

import Footer from "@/layout/Footer/Footer"
import Header from "@/layout/Header/Header"
import OrderTile from "@/components/OrderTile"

import Link from "next/link"
import FeaturedProducts from "@/components/FeaturedProducts"

const PageContent = styled.div`
    flex-grow: 1;
`

const PastOrders = styled.div`

`

const UserInfo = styled.div`

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

export default function AccountPage({account, orderHistory, featuredProducts}){

    return(
        <>
            <Header/>
            <PageContent>
                <UserInfo>
                    <p>Hey {account.name}!</p>
                    
                </UserInfo>
                <PastOrders>
                {!orderHistory.length ? 
                <>
                    <p>Your past orders</p>
                    {orderHistory.map((order, i) => (
                        <OrderTile order={order} key={i}/>
                    ))}
                </>
                : 
                <>
                    <p>You have no past orders</p>
                    <p>Browse our collections to get the latest styles!</p>
                    <NavigateButtons>
                        <Link href="/clothing/all">Clothing</Link>
                        <Link href="/shoes/all">Shoes</Link>
                        <Link href="/bags/all">Bags</Link>
                        <Link href="/jewellery-watches/all">Jewellery & Watches</Link>
                        <Link href="/accessories/all">Accessories</Link>
                    </NavigateButtons>
                    <FeaturedProductsSection>
                        <FeaturedProducts featuredProducts={featuredProducts}/>
                    </FeaturedProductsSection>
                </>
                }
                </PastOrders>
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