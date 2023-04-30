import Header from "@/layout/Header/Header"
import { useContext } from "react"
import { CheckoutContext } from "@/components/CheckoutContext"
export default function CheckoutPage() {

const {checkoutProducts} = useContext(CheckoutContext)

    return (
        <div>
            <Header/>
            <div className="wrapper">
                <div className="items">
                    {checkoutProducts?.length ?
                        <div>Your items</div>
                    : <div>your cart is empty</div>}
                </div>
                <div className="checkout">

                </div>
            </div>
        </div>
    )
}