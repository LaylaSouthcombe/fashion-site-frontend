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

const ProductInfoCell = styled.td`
    img {
        max-width: 150px;
        max-height: 150px;
    }
`

const ProductImageBox = styled.div`
    max-width: 150px;
    max-height: 150px;
    padding: 10px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    border-radius: 10px;
`

const CheckoutTable = styled.table`
    width: 100%;
    th {
        text-align: left;
        text-transform: uppercase;
        color: #ccc;
        font-weight: 600;
        font-size: 0.7rem;
    }
    td {
        border-top: 1px solid lightgrey;
    }
`

export default function CheckoutPage() {

    const {checkoutProducts, addProduct, removeProduct} = useContext(CheckoutContext)
    const [products, setProducts] = useState([])

    useEffect(() => {
        if(checkoutProducts?.length > 0){
            axios.post('/api/checkout', {ids:checkoutProducts})
                .then(response => {
                    setProducts(response.data)
                })
        }
    },[checkoutProducts])

    const lessOfThisProduct = (id) => {
        removeProduct(id)
    }

    const moreOfThisProduct = (id) => {
        addProduct(id)
    }

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
                            <CheckoutTable>
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
                                            <ProductInfoCell>
                                                <ProductImageBox>
                                                    <img src={product.images[0]} alt="product image" />
                                                </ProductImageBox>
                                                {product.name}
                                            </ProductInfoCell>
                                            <td>
                                                <button onClick={() => lessOfThisProduct(product._id)}>-</button>
                                                {checkoutProducts.filter(id => id === product._id).length}
                                                <button onClick={() => moreOfThisProduct(product._id)}>+</button>
                                            </td>
                                            <td>
                                                {checkoutProducts.filter(id => id === product._id).length * product.price}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </CheckoutTable>
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