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

    const addProduct = (productId) => {
        setCheckoutProducts(prev => [...prev, productId])
    }

    const removeProduct = (productId) => {
        setCheckoutProducts(prev => {
            const idPos = prev.indexOf(productId)
            if(idPos !== -1) {
                return prev.filter((value, i) => 
                    i !== idPos
                )
            }
            return prev
        })
    }

    const clearCheckout = () => {
        console.log('clearing checkout')
        setCheckoutProducts([])
    }

    return (
        <CheckoutContext.Provider value={{checkoutProducts, setCheckoutProducts, addProduct, removeProduct, clearCheckout}}>
            {children}
        </CheckoutContext.Provider>
    )
}