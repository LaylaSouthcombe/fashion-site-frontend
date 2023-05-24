import { useContext } from "react"
import { CheckoutContext } from "@/components/CheckoutContext"

export default function SmallAddToCartBtn({id}) {
    
    const {addProduct} = useContext(CheckoutContext)
    
    const addProductToCheckout = () => {
        addProduct(id)
    }
    
    return (
        <button onClick={() => addProductToCheckout()}>Cart icon</button>
    )
}