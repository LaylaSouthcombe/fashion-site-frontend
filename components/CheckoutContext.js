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

    const addProduct = (productSize) => {
        setCheckoutProducts(prev => [...prev, productSize])
    }

    const removeProduct = (productSize) => {
        setCheckoutProducts(prev => {
            const pos = prev.findIndex(obj => obj.id === productSize.id && obj.size === productSize.size);
            if(pos !== -1){
                return prev.filter((value, i) => i !== pos)
            }
            return prev
        })
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