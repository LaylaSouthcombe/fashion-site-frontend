import { useContext } from "react"
import { CheckoutContext } from "@/components/CheckoutContext"

export default function FeaturedProductTile({_id, name, colour, category, productType}) {
    const url = `/product/${_id}`
    const {addProduct} = useContext(CheckoutContext)
    
    const addProductToCheckout = () => {
        addProduct(_id)
    }
    
    return (
        <>
            <div>{name}</div>
            <div>{colour}</div>
            <button onClick={() => addProductToCheckout()}>Add to checkout</button>
        </>
    )
}