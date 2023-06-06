import Header from "@/layout/Header/Header"
import Footer from "@/layout/Footer/Footer"
import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"
import ProductsGrid from "@/components/ProductsGrid"
import styled from "styled-components"

const PageContent = styled.div`
    flex-grow: 1;
`

export default function AccessoriesPage({products, queryConstraint}){
    console.log(queryConstraint)
    return(
        <>
        <Header/>
        <PageContent>
        {products?.length ? 
            <ProductsGrid products={products} apiUrl={'/api/filtered/categories'} queryConstraint={queryConstraint}/>
            : null
        }
        </PageContent>
        <Footer/>
        </>
    )
}

export async function getServerSideProps(context){
    await mongooseConnect()
    let productQuery = {productCategory: 'Accessories'}
    let queryConstraint = {productCategory: 'Accessories'}
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

    console.log(productQuery)
    const products = await Product.find(productQuery, null, {sort:{'_id': -1}})

    console.log("products", products.length)
    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
            queryConstraint: queryConstraint
        }
    }
}