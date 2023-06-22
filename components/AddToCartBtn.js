import { useContext, useState } from "react"
import styled from "styled-components"

import { CheckoutContext } from "@/components/CheckoutContext"

const CheckoutButton = styled.div`
    background-color: var(--main-dark-blue);
    display: flex;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    width: 6rem;
    color: var(--main-light-blue);
    font-size: 0.75rem;
    padding: 0.75rem 0.85rem;
    :hover {
        cursor: pointer;
    }
`

const Spinner = styled.span`
    height: 0.9rem;
    width: 0.9rem;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`

export default function AddToCartBtn({productSizeQuantity}) {
    
    const {addProduct} = useContext(CheckoutContext)
    const [addToCartLoading, setAddToCartLoading] = useState(false)
    const addProductToCheckout = () => {
        setAddToCartLoading(true)
        for(let i = 0; i < productSizeQuantity.quantity; i++){
            let itemToAdd = {}
            itemToAdd.id = productSizeQuantity.id
            itemToAdd.size = productSizeQuantity.size
            addProduct(itemToAdd)
        }
        setTimeout(() => {
            setAddToCartLoading(false);
        }, 2000);
    }
    
    return (
        <CheckoutButton onClick={() => addProductToCheckout()}>
            {addToCartLoading ? 
            <Spinner></Spinner>
            : 
            "Add to cart"}
        </CheckoutButton>
    )
}