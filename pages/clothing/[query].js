import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"
import styled from "styled-components"

import Footer from "@/layout/Footer/Footer"
import Header from "@/layout/Header/Header"
import ProductsGrid from "@/components/ProductsGrid"

const PageContent = styled.div`
    flex-grow: 1;
`

export default function ClothingPage({products, queryConstraint}){
    console.log(queryConstraint)
    return(
        <>
            <Header/>
            <PageContent>
                {products?.length ? 
                    <ProductsGrid products={products} apiUrl={'/api/filtered/categories'} queryConstraint={queryConstraint}/>
                : null}
            </PageContent>
            <Footer/>
        </>
    )
}

export async function getServerSideProps(context){
    await mongooseConnect()
    let productQuery = {productCategory: 'Clothing'}
    let queryConstraint = {productCategory: 'Clothing'}
    const {query} = context.query

    const capitalizeFirstLetter = (word) => {
        const firstLetter = word.charAt(0)
        const firstLetterCap = firstLetter.toUpperCase()
        const remainingLetters = word.slice(1)
        const capitalizedQueryWord = firstLetterCap + remainingLetters
        return capitalizedQueryWord
    }
    
    if(query.includes("-s-")){
        let queryWord = capitalizeFirstLetter(query.split("-s-")[1])
        let queryRegexWord = new RegExp(queryWord, "si")
        productQuery["productSubType"] = queryRegexWord
        queryConstraint["path"] = 'productSubType'
        queryConstraint["value"] = queryWord.replace("-", " ")
    } else if(query.includes("-t-")){
        let queryWord = capitalizeFirstLetter(query.split("-t-")[1])
        productQuery["productType"] = queryWord
        queryConstraint["path"] = 'productType'
        queryConstraint["value"] = queryWord.replace("-", " ")
    }

    const products = await Product.find(productQuery, null, {sort:{'_id': -1}})

    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
            queryConstraint: queryConstraint
        }
    }
}