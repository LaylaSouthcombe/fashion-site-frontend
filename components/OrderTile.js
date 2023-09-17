import styled from "styled-components"

const OrderContainer = styled.div`
    width: 100%;
    margin-top: 20px;
    border-top: 1px solid var(--main-lightish-blue);
`

const LineItemsAddressContainer = styled.div`
    display: grid;
    grid-template-columns: 100%;
    @media (min-width: 768px) {
        grid-template-columns: 60% 40%;
    }
`

const LineItemsContainer = styled.div`

`

const AddressContainer = styled.div`
    padding: 20px;
    p {
        margin: 5px;
    }
    p:first-child {
        font-weight: bold;
    }
`

const ProductImageBox = styled.div`
    max-width: 150px;
    padding: 10px;
    img {
        width: 100%;
        height: auto;
    }
`

const ProductInfo = styled.div`
    margin-left: 1rem;
`

const ProductTitle = styled.p`
    margin: 0.5rem 0;
`

const ProductDate = styled.p`
    margin: 1rem;
    font-size: 0.9rem;
`

const ProductColourSizePrice = styled.div`
    display: flex;
    align-items: center;
    font-size: 0.5rem;
    gap: 0.5rem;
    color: var(--main-lighter-blue);
    span {
        font-size: 0.9rem;
        color: var(--main-lighter-blue);
    }
`
const ProductQuantityButtons = styled.div`
    border: 1px solid var(--main-lightish-blue);
    padding: 0.2rem;
    margin: 0.75rem 0rem 0.75rem 0.25rem;
    display: flex;
    border-radius: 5px;
    width: fit-content;
    button {
        padding: 0.25rem;
        border: none;
        background-color: white;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        img {
            width: 0.7rem;
            height: auto;
        }
    }
    button:first-child {
        margin: 0 0.5rem 0 0;
    }
    button:nth-child(2) {
        margin: 0  0 0 0.5rem;
    }
    span {
        margin: 0rem 0.75rem;
    }
`

const ProductQtySubArea = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`

const ProductSubTotal = styled.p`
`

const OrderTotal = styled.div`
    display: flex;
    gap: 1rem;
    margin: 1rem;
    justify-content: flex-end;
    font-weight: bold;
`

const LineItem = styled.div`
    display: flex;
    margin-left: 10%;
`

export default function OrderTile({order}) {

    const originalDateString = order.createdAt
    const originalDate = new Date(originalDateString)

    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
    }

    const formattedDate = originalDate.toLocaleDateString("en-US", options)

    const day = originalDate.getDate()
    const daySuffix = getDaySuffix(day)

    function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
        return "th"
    }
    switch (day % 10) {
        case 1:
            return "st"
        case 2:
            return "nd"
        case 3:
            return "rd"
        default:
            return "th"
    }
    }

    const formattedDateWithSuffix = `${day}${daySuffix} ${formattedDate}`

    return (
        <OrderContainer>
            <ProductDate>{formattedDateWithSuffix}</ProductDate>
            <LineItemsAddressContainer>
                <LineItemsContainer>
                    {order.line_items.map((item, i) => (
                        <LineItem key={i}>
                            <ProductImageBox>
                                <img src={item.price_data.product_data.images[0]} alt="product image" />
                            </ProductImageBox>
                            <ProductInfo>
                                <ProductTitle>{item.price_data.product_data.name}</ProductTitle>
                                <ProductColourSizePrice>
                                    <span>{item.price_data.product_data.description}</span>
                                </ProductColourSizePrice>
                                <ProductQtySubArea>
                                    <ProductQuantityButtons>
                                        {item.quantity}
                                    </ProductQuantityButtons>
                                    <ProductSubTotal>
                                        £{(item.quantity * item.price_data.unit_amount / 100).toLocaleString()}
                                    </ProductSubTotal>
                                </ProductQtySubArea>
                            </ProductInfo>
                        </LineItem>
                    ))}
                </LineItemsContainer>
                <AddressContainer>
                    <p>Delivery Address</p>
                    <p>{order.name}</p>
                    <p>{order.streetAddress}</p>
                    <p>{order.city}</p>
                    <p>{order.postalCode}</p>
                    <p>{order.country}</p>
                </AddressContainer>
            </LineItemsAddressContainer>
            <OrderTotal>Total: £{(order.orderTotalPrice / 100).toLocaleString()}</OrderTotal>
        </OrderContainer>
    )
}