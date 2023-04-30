import { useContext } from "react"
import { CartContext } from "./CartContext"

export default function FeaturedProductTile({_id, name, colour, category, productType}) {
    const url = `/product/${_id}`
    const {addProduct} = useContext(CartContext)
    
    const addProductToCart = () => {
        addProduct(prev => [...prev, _id])
    }
    
    return (
        <>
            <div>{name}</div>
            <div>{colour}</div>
            <button onClick={addProductToCart}>Add to cart</button>
        </>
    )
}