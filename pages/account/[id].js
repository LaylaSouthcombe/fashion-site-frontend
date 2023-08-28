import { mongooseConnect } from "@/lib/mongoose"
import { Account } from "@/models/Account"
import { Order } from "@/models/Order"
import styled from "styled-components"

import Footer from "@/layout/Footer/Footer"
import Header from "@/layout/Header/Header"
import OrderTile from "@/components/OrderTile"

const PageContent = styled.div`
    flex-grow: 1;
`

const PastOrders = styled.div`

`

export default function AccountPage({account, orderHistory}){
    console.log(account)
    return(
        <>
            <Header/>
            <PageContent>
                <PastOrders>

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
    const orderHistory =  await Order.find(orderQuery, null, {sort:{'_id': -1}})

    
    return {
        props: {
            account: JSON.parse(JSON.stringify(account)),
            orderHistory: JSON.parse(JSON.stringify(orderHistory))
        }
    }
}