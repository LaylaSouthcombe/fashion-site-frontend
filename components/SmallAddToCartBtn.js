import { useContext } from "react"
import { CheckoutContext } from "@/components/CheckoutContext"
import styled from "styled-components"
const checkoutIcon = '@/images/icons/checkout.png'


const CheckoutButton = styled.button`
    background-color: black;
    border-radius: 5px;
`

export default function SmallAddToCartBtn({id}) {
    
    const {addProduct} = useContext(CheckoutContext)
    
    const addProductToCheckout = () => {
        addProduct(id)
    }
    
    return (
        <CheckoutButton onClick={() => addProductToCheckout()}>
            Cart icon
            <img src={checkoutIcon} alt="" />
        </CheckoutButton>
    )
}