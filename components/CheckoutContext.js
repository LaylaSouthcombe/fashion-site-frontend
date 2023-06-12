import {createContext, useEffect, useState} from 'react'

export const CheckoutContext = createContext({})

export function CheckoutContextProvider({children})  {

    const ls = typeof window !== "undefined" ? window.localStorage : null
    
    const [checkoutProducts, setCheckoutProducts] = useState([])

    useEffect(() =>{
        if(checkoutProducts?.length > 0){
            ls?.setItem('checkout', JSON.stringify(checkoutProducts))
        }
    }, [checkoutProducts])

    useEffect(() => {
        if(ls && ls.getItem('checkout')){
            setCheckoutProducts(JSON.parse(ls.getItem('checkout')))
        }
    }, [])

    const addProduct = (productSizeQuantity) => {
        let currentCheckoutProducts = checkoutProducts
        let filteredProducts = currentCheckoutProducts.filter(product => product.id === productSizeQuantity.id && product.size === productSizeQuantity.size)
        if(filteredProducts?.length > 0){
            currentCheckoutProducts.find(product => product.id === productSizeQuantity.id && product.size === productSizeQuantity.size).quantity += productSizeQuantity.quantity;
            setCheckoutProducts(currentCheckoutProducts)
        } else {
            setCheckoutProducts(prev => [...prev, productSizeQuantity])
        }
    }

    const removeProduct = (productSizeQuantity) => {
        let currentCheckoutProducts = checkoutProducts
        let filteredProducts = currentCheckoutProducts.filter(product => product.id === productSizeQuantity.id && product.size === productSizeQuantity.size)
        if(filteredProducts?.length > 0){
            currentCheckoutProducts.find(product => product.id === productSizeQuantity.id && product.size === productSizeQuantity.size).quantity -= 1
            setCheckoutProducts(currentCheckoutProducts)
            console.log(currentCheckoutProducts)
        }
    }

    const clearCheckout = () => {
        console.log('clearing checkout')
        setCheckoutProducts([])
        ls?.removeItem('checkout')
    }

    return (
        <CheckoutContext.Provider value={{checkoutProducts, setCheckoutProducts, addProduct, removeProduct, clearCheckout}}>
            {children}
        </CheckoutContext.Provider>
    )
}