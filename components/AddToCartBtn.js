import { useContext } from "react"
import styled from "styled-components"

import { CheckoutContext } from "@/components/CheckoutContext"

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
    
    const addProductToCheckout = () => {
        for(let i = 0; i < productSizeQuantity.quantity; i++){
            let itemToAdd = {}
            itemToAdd.id = productSizeQuantity.id
            itemToAdd.size = productSizeQuantity.size
            addProduct(itemToAdd)
        }
    }
    
    return (
        <CheckoutButton onClick={() => addProductToCheckout()}>
            Add to cart
        </CheckoutButton>
    )
}