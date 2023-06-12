import React, { useContext, useEffect, useState } from "react"
import Header from "@/layout/Header/Header"
import Footer from "@/layout/Footer/Footer"
import { CheckoutContext } from "@/components/CheckoutContext"
import Input from "@/components/Input"
import styled from "styled-components"
import axios from "axios"
import PlusSign from "../images/icons/plus.png"
import MinusSign from "../images/icons/minus.png"
import Image from "next/image"

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
    display: flex;
    margin-top: 1rem;
    border-top: 1px solid var(--main-lightish-blue);
    padding-top: 0.75rem;
`

const ProductImageBox = styled.div`
    max-width: 150px;
    padding: 10px;
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
                                                    <Image src={MinusSign}/>
                                                </button>
                                                    {checkoutProducts.filter(checkoutProduct => checkoutProduct._id === product.id && checkoutProduct.size === product.size)?.length}
                                                <button onClick={() => moreOfThisProduct({id: product._id, size: product.size})}>
                                                    <Image src={PlusSign}/>
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