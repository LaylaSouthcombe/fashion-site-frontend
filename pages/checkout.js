import React, { useContext, useEffect, useState } from "react"
import { mongooseConnect } from "@/lib/mongoose"
import {Featured} from "@/models/Featured"

import styled from "styled-components"
import axios from "axios"
import Image from "next/image"

import { CheckoutContext } from "@/components/CheckoutContext"
import Footer from "@/layout/Footer/Footer"
import Header from "@/layout/Header/Header"
import Input from "@/components/Input"

import MinusSign from "../images/icons/minus.png"
import PlusSign from "../images/icons/plus.png"
import BannerAdImage from "@/images/bannerAdImage.jpg"
import FeaturedProducts from "@/components/FeaturedProducts"
import Link from "next/link"

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    margin: 40px auto;
    width: 80%;
    max-width: 900px;
    @media (min-width: 768px) {
        grid-template-columns: ${props => props.gridcolumns};
        width: 90%;
    }
`

const Box = styled.div`
    padding: 1rem;
`

const OrderThankYouArea = styled.div`
    padding: 1rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    h2 {
        margin: 2rem;
    }
    p {
        margin: 1rem;
        font-size: 1.1rem;
    }
`

const ThankYouImage = styled.div`
    width: 80%;
    margin: 1rem auto;
    border-top: 2px solid var(--main-dark-blue);
    padding: 2rem;
    img {
        width: 100%;
        height: auto;
    }
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
        border-radius: 5px;
        color: var(--main-light-blue);
        background-color: var(--main-dark-blue);
    }
`

const ShippingTitleAndButton = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
`

const DemoDataButton = styled.button`
    max-width:fit-content;
    font-size: 0.8rem;
    background-color: #f2f3f5;
    outline: none;
    padding: 0.5rem 0.65rem;
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
    max-width: 280px;
    font-size: 0.9rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-items: center;
    margin:  0 auto 5px auto;
    p {
        color: #e64949;
        width: 100%;
    }
`

const PaymentButton = styled.button`
    width: 100%;
    padding: 0.75rem 0.85rem;
    font-size: 0.9rem;
`

const CartEmptyArea = styled.div`
    padding: 2rem;
    h2 {
        margin-bottom: 1rem;
    }
    > p {
        font-size: 1.1rem;
        margin: 0.5rem 0;
    }
`

const FeaturedProductsSection = styled.div`
    width: 90%;
    max-width: 1200px;
    margin: 2rem auto 4rem auto;
`

const NavigateButtons = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 1rem 0;
    a {
        text-decoration: none;
        border-radius: 5px;
        color: var(--main-light-blue);
        background-color: var(--main-dark-blue);
        padding: 0.5rem 0.65rem;
        margin: 0.2rem 0.2rem 0.2rem 0;
        font-size: 0.9rem;
    }
`

export default function CheckoutPage({featuredProducts}) {

    const {checkoutProducts, addProduct, removeProduct, clearCheckout, inputConfirmedOrder, confirmedOrder} = useContext(CheckoutContext)

    const [products, setProducts] = useState([])
    const [name, setName] = useState('')    
    const [email, setEmail] = useState('')    
    const [streetAddress, setStreetAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [paymentErrorMessage, setPaymentErrorMessage] = useState('')
    const [confirmedOrderDetails, setConfirmedOrderDetails] = useState()
    
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
    const ls = typeof window !== "undefined" ? window.localStorage : null
    
    
    useEffect(() => {
        if(typeof window === 'undefined'){
            return
        }
        if(window?.location.href.includes('success')){
            if(ls && ls.getItem('order')){
                console.log("storage order ", JSON.parse(ls.getItem('order')))
                setConfirmedOrderDetails(JSON.parse(ls.getItem('order')))
                ls?.removeItem('order')
            }
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

    const inputDemoData = () => {
        setName("Tina Belcher")
        setEmail("TinaBelcher123@example.com")
        setStreetAddress("Flat 1, Ocean Avenue")
        setCity("Seymour's Bay")
        setPostalCode("07097")
        setCountry("USA")
        setPaymentErrorMessage("Use this card number on next page: 4242 4242 4242 4242")
    }
    
    const goToPayment = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(name.length !== 0 && email.length !== 0 && streetAddress.length !== 0 && city.length !== 0 && country.length !== 0 && postalCode.length !== 0 && checkoutProducts.length !== 0 && emailRegex.test(email)) {
            const response = await axios.post('/api/payment', {
                name,email,streetAddress,city,country,postalCode,checkoutProducts
            })
            console.log(response)
            if(response.data.order.line_items?.length){
                console.log(response.data.order.line_items)
                ls?.setItem('order', JSON.stringify(response.data.order))
            }
            if(response.data.url){
                window.location = response.data.url
            }
        } else if(checkoutProducts.length !== 0 && emailRegex.test(email)) {
            setPaymentErrorMessage("Please fill in all fields")
        } else if(!emailRegex.test(email)){
            setPaymentErrorMessage("Please enter a valid email address")
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
                <Header/>
                    <ColumnsWrapper gridcolumns={"1fr 1fr"}>
                        <Box>
                            {confirmedOrderDetails !== undefined? 
                                <>
                                    {confirmedOrderDetails.line_items.map((product, i) => (
                                <CheckoutProductContainer key={"product" + i}>
                                    {console.log(product)}
                                    <ProductImageBox>
                                        <img src={product.price_data.product_data.images[0]} alt="product image" />
                                    </ProductImageBox>
                                    <ProductInfo>
                                        <ProductTitle>{product.price_data.product_data.name}</ProductTitle>
                                        <ProductColourSizePrice>
                                            <span>{product.price_data.product_data.description}</span>
                                        </ProductColourSizePrice>
                                        <ProductQtySubArea>
                                            <ProductQuantityButtons>
                                                {product.quantity}
                                            </ProductQuantityButtons>
                                            <ProductSubTotal>
                                                £{(product.quantity * product.price_data.unit_amount / 100).toLocaleString()}
                                            </ProductSubTotal>
                                        </ProductQtySubArea>
                                    </ProductInfo>
                                </CheckoutProductContainer>
                            )
                            )}
                            <OrderTotal>
                                <p>Total</p>
                                <p>£{(confirmedOrderDetails.orderTotalPrice / 100).toLocaleString()}</p>
                            </OrderTotal>
                                </>
                            : null}
                        </Box>
                        <OrderThankYouArea>
                            <h2>Thanks for your order!</h2>
                            <p>You will shortly receive an email containing your order confirmation</p>
                            <ThankYouImage>
                                <Image src={BannerAdImage} alt="Three males models sat on chairs"/>
                            </ThankYouImage>
                        </OrderThankYouArea>
                    </ColumnsWrapper>
                <Footer/>
            </>
        )
    }
    return (
        <>
            <Header/>
                {!checkoutProducts?.length || !products?.length > 0 ?
                <>
                <ColumnsWrapper gridcolumns={"1.1fr 0.9fr"}>
                    <CartEmptyArea>
                        <h2>Basket</h2>
                        <p>Your cart is empty</p>
                        <p>Browse our collections to get the latest styles!</p>
                        <NavigateButtons>
                            <Link href="/clothing/all">Clothing</Link>
                            <Link href="/shoes/all">Shoes</Link>
                            <Link href="/bags/all">Bags</Link>
                            <Link href="/jewellery-watches/all">Jewellery & Watches</Link>
                            <Link href="/accessories/all">Accessories</Link>
                        </NavigateButtons>
                    </CartEmptyArea>
                    <ThankYouImage>
                        <Image src={BannerAdImage} alt="Three males models sat on chairs"/>
                    </ThankYouImage>
                </ColumnsWrapper>
                <FeaturedProductsSection>
                    <FeaturedProducts featuredProducts={featuredProducts}/>
                </FeaturedProductsSection>
                </>
                : 
                    <>
                    <ColumnsWrapper gridcolumns={"1.2fr 0.8fr"}>
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
                                            <span>£{product.price}</span>
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
                            <ShippingTitleAndButton>
                                <p>Shippping information</p>
                                <DemoDataButton onClick={() => inputDemoData()}>Use demo data</DemoDataButton>
                            </ShippingTitleAndButton>
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
                            <PaymentButton type="submit"
                            onClick={goToPayment}>Continue to payment</PaymentButton>
                            <input type="hidden"
                            name="products" 
                            value={checkoutProducts.join(',')}/>
                        </ShippingInformationContainer>
                    </ColumnsWrapper>
                    </>
                }
            
            <Footer/>
        </>
    )
}
export async function getServerSideProps() {

    await mongooseConnect()
  
    const featuredProducts = await Featured.find({})
    return {
      props: {
        featuredProducts: JSON.parse(JSON.stringify(featuredProducts))
      }
    }
  }