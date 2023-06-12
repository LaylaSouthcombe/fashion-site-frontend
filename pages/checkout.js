import React, { useContext, useEffect, useState } from "react"
import Header from "@/layout/Header/Header"
import Footer from "@/layout/Footer/Footer"
import { CheckoutContext } from "@/components/CheckoutContext"
import Input from "@/components/Input"
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

const CityHolder = styled.div`
    display: flex;
    gap: 5px;
    width: 100%;
    justify-content: space-between;
`

export default function CheckoutPage() {

    const {checkoutProducts, addProduct, removeProduct, clearCheckout} = useContext(CheckoutContext)
    const [products, setProducts] = useState([])

    const [name, setName] = useState('')    
    const [email, setEmail] = useState('')    
    const [streetAddress, setStreetAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        if(checkoutProducts?.length > 0){
            console.log("checkoutProducts", checkoutProducts)
            axios.post('/api/checkout', {products:checkoutProducts})
                .then(response => {
                    console.log("response.data", response.data)
                    setProducts(response.data)
                })
        } else {
            setProducts([])
        }
    },[checkoutProducts])

    useEffect(() => {
        console.log('hi')
        if(typeof window === 'undefined'){
            return
        }
        if(window?.location.href.includes('success')){
            setIsSuccess(true)
            clearCheckout()
        }
    }, [])
    // {id: product.id, size: selectedSize, quantity: numberOfSelectedStock}
    const lessOfThisProduct = (productSizeQuantity) => {
        removeProduct(productSizeQuantity)
    }

    const moreOfThisProduct = (productSizeQuantity) => {
        addProduct(productSizeQuantity)
    }

    const goToPayment = async () => {
        const response = await axios.post('/api/payment', {
            name,email,streetAddress,city,country,postalCode, checkoutProducts
        })
        if(response.data.url){
            window.location = response.data.url
        }
    }

    let total = 0

    for(const product of checkoutProducts){
        const price = products.find(p => p._id === product.id)?.price || 0
        total += price
    }

    if(isSuccess){
        return(
            <>
                <ColumnsWrapper>
                    <Box>
                        <h1>Thanks for your order!</h1>
                        <p>We will email you when your order is dispatched</p>
                    </Box>
                </ColumnsWrapper>
            </>
        )
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
                                    {/* current issue: not returning multiple products for checkout page so can't split by size, maybe have numerous sizes under one section?*/}
                                    {products.map((product, i) => (

                                        <tr key={"product" + i}>
                                            {console.log(product.size)}
                                            <ProductInfoCell>
                                                <ProductImageBox>
                                                    <img src={product.images[0]} alt="product image" />
                                                </ProductImageBox>
                                                {product.name}
                                                {product.size.size}
                                            </ProductInfoCell>
                                            <td>
                                                {/* {id: product._id, size: selectedSize, quantity: numberOfSelectedStock} */}
                                                <button onClick={() => lessOfThisProduct(product._id)}>-</button>
                                                {checkoutProducts.filter(id => id === product._id).length}
                                                <button onClick={() => moreOfThisProduct(product._id)}>+</button>
                                            </td>
                                            <td>
                                                {checkoutProducts.filter(id => id === product._id).length * product.price}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>{total}</td>
                                    </tr>
                                </tbody>
                            </CheckoutTable>
                        </Box>
                        <Box>
                            <p>Order information</p>
                                <Input type="text" 
                                placeholder="Name" 
                                value={name}
                                name="name" 
                                onChange={(e) => setName(e.target.value)}/>
                                <Input type="text" 
                                placeholder="Email" 
                                value={email}
                                name="email" 
                                onChange={(e) => setEmail(e.target.value)}/>
                                <Input type="text" 
                                placeholder="Street address" 
                                value={streetAddress}
                                name="streetAddress" 
                                onChange={(e) => setStreetAddress(e.target.value)}/>
                                <CityHolder>
                                    <Input type="text" 
                                    placeholder="City" 
                                    value={city}
                                    name="city" 
                                    onChange={(e) => setCity(e.target.value)}/>
                                    <Input type="text" 
                                    placeholder="Postal code" 
                                    value={postalCode}
                                    name="postalCode" 
                                    onChange={(e) => setPostalCode(e.target.value)}/>
                                </CityHolder>
                                <Input type="text" 
                                placeholder="Country" 
                                value={country}
                                name="country" 
                                onChange={(e) => setCountry(e.target.value)}/>
                                <button type="submit"
                                onClick={goToPayment}>Continue to payment</button>
                                <input type="hidden"
                                name="products" 
                                value={checkoutProducts.join(',')}/>
                        </Box>
                    </>
                    }
            </ColumnsWrapper>
            <Footer/>
        </div>
    )
}