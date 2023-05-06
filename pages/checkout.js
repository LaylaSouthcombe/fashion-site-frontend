import React, { useContext, useEffect, useState } from "react"
import Header from "@/layout/Header/Header"
import { CheckoutContext } from "@/components/CheckoutContext"
import styled from "styled-components"
import axios from "axios"

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap:40px;
    margin: 40px auto;
    width: 90%;
    max-width: 900px;
`

const Box = styled.div`
    background-color: purple;
    border-radius: 10px;
    padding: 30px;
`
export default function CheckoutPage() {

    const {checkoutProducts} = useContext(CheckoutContext)
    const [products, setProducts] = useState([])

    useEffect(() => {
        if(checkoutProducts?.length > 0){
            axios.post('/api/checkout', {ids:checkoutProducts})
                .then(response => {
                    setProducts(response.data)
                })
        }
    },[checkoutProducts])

    return (
        <div>
            <Header/>
            <ColumnsWrapper>
                    {!checkoutProducts?.length || !products?.length > 0 ?
                    <Box>
                        <h2>Basket</h2>
                        <div>your cart is empty</div>
                    </Box>
                    : 
                    <>
                        <Box>
                            <div>Your basket</div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, i) => (
                                        <tr key={"product" + i}>
                                            <td>
                                                {product.name}
                                            </td>
                                            <td>
                                                {checkoutProducts.filter(id => id === product._id).length}
                                            </td>
                                            <td>
                                                {product.price}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Box>
                        <Box>
                            <p>Order information</p>
                            <input type="text" placeholder="address"/>
                            <input type="text" placeholder="address 2"/>
                            <button>Continue to payment</button>
                        </Box>
                    </>
                    }
            </ColumnsWrapper>
        </div>
    )
}