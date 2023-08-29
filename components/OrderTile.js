import styled from "styled-components"
import Image from "next/image"

const OrderContainer = styled.div`
    width: 80%;
`

export default function OrderTile({order}) {
    return (
        <OrderContainer>
            <p>{order.email}</p>
        </OrderContainer>
    )
}