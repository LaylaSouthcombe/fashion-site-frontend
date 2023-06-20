import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import Image from "next/image"

import { CheckoutContext } from "@/components/CheckoutContext"
import Footer from "@/layout/Footer/Footer"
import Header from "@/layout/Header/Header"
import Input from "@/components/Input"

import MinusSign from "../images/icons/minus.png"
import PlusSign from "../images/icons/plus.png"

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    margin: 40px auto;
    width: 80%;
    max-width: 900px;
    @media (min-width: 768px) {
        grid-template-columns: 1.2fr 0.8fr;
        width: 90%;
    }
`

const Box = styled.div`
    padding: 1rem;
`

const CheckoutProductContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    margin-top: 1rem;
    border-top: 1px solid var(--main-lightish-blue);
    padding-top: 0.75rem;
    @media (min-width: 550px) {
        grid-template-columns: 0.3fr 0.7fr;
    }
`

const ProductImageBox = styled.div`
    max-width: 150px;
    padding: 10px;
    margin: 0 auto;
    img {
        width: 100%;
        height: auto;
        
    }
`

const ProductInfo = styled.div`
    margin-left: 1rem;
`

const ProductTitle = styled.p`
    margin: 0.5rem 0;
`

const ProductBrand = styled.p`
    margin: 0.5rem 0;
    font-size: 0.9rem;
    color: var(--main-lighter-blue);
`

const ProductColourSizePrice = styled.div`
    display: flex;
    align-items: center;
    font-size: 0.5rem;
    gap: 0.5rem;
    color: var(--main-lighter-blue);
    span {
        font-size: 0.9rem;
        color: var(--main-lighter-blue);
    }
`
const ProductQuantityButtons = styled.div`
    border: 1px solid var(--main-lightish-blue);
    padding: 0.2rem;
    margin: 0.75rem 0rem 0.75rem 0.25rem;
    display: flex;
    border-radius: 5px;
    width: fit-content;
    button {
        padding: 0.25rem;
        border: none;
        background-color: white;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        img {
            width: 0.7rem;
            height: auto;
        }
    }
    button:first-child {
        margin: 0 0.5rem 0 0;
    }
    button:nth-child(2) {
        margin: 0  0 0 0.5rem;
    }
    span {
        margin: 0rem 0.75rem;
    }
`

const ProductQtySubArea = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`

const ProductSubTotal = styled.p`
`

const OrderTotal = styled.div`
    display: flex;
    gap: 1rem;
    margin: 1rem;
    justify-content: flex-end;
`

const ShippingInformationContainer = styled.div`
    padding: 1rem;
    max-width: 400px;
    margin: 0 auto;
    > p {
        margin-bottom: 1rem;
        width: 100%;
    }
    button {
        background-color: var(--main-dark-blue);
        border-radius: 5px;
        width: 100%;
        color: var(--main-light-blue);
        font-size: 0.9rem;
        padding: 0.75rem 0.85rem;
    }
`

const ShippingInput = styled(Input)`
    outline: #f2f3f5;
    border: 2px solid #dee1e3;
    background: #f2f3f5;
    padding: 5px 10px;
    border-radius: 0.4rem;
`

const CityHolder = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    justify-content: space-between;
    @media (min-width: 360px) {
        flex-direction: row;
    }
`

const PaymentErrorMessage = styled.div`
    height: 1.75rem;
    font-size: 0.9rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-items: center;
    margin-bottom: 5px;
    p {
        color: #e64949;
        width: 100%;
    }
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
    const [paymentErrorMessage, setPaymentErrorMessage] = useState('')

    useEffect(() => {
        if(checkoutProducts?.length > 0){
            axios.post('/api/checkout', {products:checkoutProducts})
                .then(response => {
                    setProducts(response.data)
                })
        } else {
            setProducts([])
        }
    },[checkoutProducts])

    useEffect(() => {
        if(typeof window === 'undefined'){
            return
        }
        if(window?.location.href.includes('success')){
            setIsSuccess(true)
            clearCheckout()
        }
    }, [])

    const lessOfThisProduct = (productSizeQuantity) => {
        removeProduct(productSizeQuantity)
    }

    const moreOfThisProduct = (productSizeQuantity) => {
        addProduct(productSizeQuantity)
    }

    const goToPayment = async () => {
        if(name.length !== 0 && email.length !== 0 && streetAddress.length !== 0 && city.length !== 0 && country.length !== 0 && postalCode.length !== 0 && checkoutProducts.length !== 0) {
            const response = await axios.post('/api/payment', {
                name,email,streetAddress,city,country,postalCode,checkoutProducts
            })
            if(response.data.url){
                window.location = response.data.url
            }
        } else if(checkoutProducts.length !== 0) {
            setPaymentErrorMessage("Please fill in all fields")
        } else {
            setPaymentErrorMessage("There are no items in your basket")
        }
        
    }

    let total = 0

    for(const product of checkoutProducts){
        const price = products.find(p => p._id === product.id)?.price || 0
        total += price
    }

    if(isSuccess){
        return (
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
        <>
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
                                {products.map((product, i) => (
                                    <CheckoutProductContainer key={"product" + i}>
                                        <ProductImageBox>
                                            <img src={product.images[0]} alt="product image" />
                                        </ProductImageBox>
                                        <ProductInfo>
                                            <ProductTitle>{product.name}</ProductTitle>
                                            <ProductBrand>{product.brand}</ProductBrand>
                                            <ProductColourSizePrice>
                                                <span>{product.colour}</span>
                                                &#x2666;
                                                <span>{product.size}</span>
                                                &#x2666;
                                                <span>{product.price}</span>
                                            </ProductColourSizePrice>
                                            <ProductQtySubArea>
                                                <ProductQuantityButtons>
                                                    <button onClick={() => lessOfThisProduct({id: product._id, size: product.size})}>
                                                        <Image src={MinusSign} alt="minus sign button"/>
                                                    </button>
                                                        {checkoutProducts.filter(checkoutProduct => checkoutProduct._id === product.id && checkoutProduct.size === product.size)?.length}
                                                    <button onClick={() => moreOfThisProduct({id: product._id, size: product.size})}>
                                                        <Image src={PlusSign} alt="plus sign button"/>
                                                    </button>
                                                </ProductQuantityButtons>
                                                <ProductSubTotal>
                                                    £{checkoutProducts.filter(checkoutProduct => checkoutProduct._id === product.id && checkoutProduct.size === product.size)?.length * product.price}
                                                </ProductSubTotal>
                                            </ProductQtySubArea>
                                        </ProductInfo>
                                    </CheckoutProductContainer>
                                ))}
                            <OrderTotal>
                                <p>Total</p>
                                <p>£{total}</p>
                            </OrderTotal>
                        </Box>
                        <ShippingInformationContainer>
                            <p>Shippping information</p>
                            <ShippingInput type="text" 
                            placeholder="Name" 
                            value={name}
                            name="name"
                            onChange={(e) => setName(e.target.value)}/>
                            <ShippingInput type="text" 
                            placeholder="Email" 
                            value={email}
                            name="email" 
                            onChange={(e) => setEmail(e.target.value)}/>
                            <ShippingInput type="text" 
                            placeholder="Street address" 
                            value={streetAddress}
                            name="streetAddress" 
                            onChange={(e) => setStreetAddress(e.target.value)}/>
                            <CityHolder>
                                <ShippingInput type="text" 
                                placeholder="City" 
                                value={city}
                                name="city" 
                                onChange={(e) => setCity(e.target.value)}/>
                                <ShippingInput type="text" 
                                placeholder="Postal code" 
                                value={postalCode}
                                name="postalCode" 
                                onChange={(e) => setPostalCode(e.target.value)}/>
                            </CityHolder>
                            <ShippingInput type="text" 
                            placeholder="Country" 
                            value={country}
                            name="country"
                            onChange={(e) => setCountry(e.target.value)}/>
                            <PaymentErrorMessage>
                                <p>{paymentErrorMessage}</p>
                            </PaymentErrorMessage>
                            <button type="submit"
                            onClick={goToPayment}>Continue to payment</button>
                            <input type="hidden"
                            name="products" 
                            value={checkoutProducts.join(',')}/>
                        </ShippingInformationContainer>
                    </>
                }
            </ColumnsWrapper>
            <Footer/>
        </>
    )
}