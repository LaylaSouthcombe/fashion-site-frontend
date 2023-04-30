import {createContext, useEffect, useState} from 'react'

export const CheckoutContext = createContext({})

export function CheckoutContextProvider({children})  {

    const ls = typeof window !== "undefined" ? localStorage : null
    
    const [checkoutProducts, setCheckoutProducts] = useState([])
    
    useEffect(() =>{
        if(checkoutProducts?.length > 0){
            ls.setItem('checkout', JSON.stringify(checkoutProducts))
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

    return (
        <CheckoutContext.Provider value={{checkoutProducts, setCheckoutProducts, addProduct}}>
            {children}
        </CheckoutContext.Provider>
    )
}