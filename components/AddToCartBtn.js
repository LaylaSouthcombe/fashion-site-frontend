import { useContext } from "react"
import { CheckoutContext } from "@/components/CheckoutContext"
import styled from "styled-components"
import addToCart from '../images/icons/add-cart.png'
import Image from "next/image"

const CheckoutButton = styled.div`
    background-color: black;
    display: flex;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    height: 2.5rem;
    img {
        width: 50%;
        height: auto;
    }
`

export default function AddToCartBtn({id}) {
    
    const {addProduct} = useContext(CheckoutContext)
    
    const addProductToCheckout = () => {
        addProduct(id)
    }
    
    return (
        <CheckoutButton onClick={() => addProductToCheckout()}>
            <Image src={addToCart} alt="" width={30} height={30}/>
        </CheckoutButton>
    )
}