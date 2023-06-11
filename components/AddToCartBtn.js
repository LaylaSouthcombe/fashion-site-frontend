import { useContext } from "react"
import { CheckoutContext } from "@/components/CheckoutContext"
import styled from "styled-components"

const CheckoutButton = styled.div`
    background-color: var(--main-dark-blue);
    display: flex;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    width: fit-content;
    color: var(--main-light-blue);
    font-size: 0.75rem;
    padding: 0.75rem 0.85rem;
`

export default function AddToCartBtn({productSizeQuantity}) {
    
    const {addProduct} = useContext(CheckoutContext)
    console.log(productSizeQuantity)
    const addProductToCheckout = () => {
        addProduct(productSizeQuantity)
    }
    
    return (
        <CheckoutButton onClick={() => addProductToCheckout()}>
            Add to cart
        </CheckoutButton>
    )
}