import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"
import styled from "styled-components"

import Footer from "@/layout/Footer/Footer"
import Header from "@/layout/Header/Header"
import ProductTile from "@/components/ProductsCarousel/ProductTile"

const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
`

export default function SearchResults({products}) {

    return (
        <>
            <Header/>
            <ProductGrid>
                {products !== undefined ? 
                    products.map((product, i) => {
                        return (
                            <ProductTile product={product} key={"productTile" + i}/>
                        )
                    })
                : null}
            </ProductGrid>
            <Footer/>
        </>
    )
}

export async function getServerSideProps(context){
    await mongooseConnect()

    const {query} = context.query

    const products = await Product.aggregate([{
        $search: {
          index: "default",
          text: {
            query: query.replace("-", " "),
            path: {
              wildcard: "*"
            }
          }
        }
    }]).limit(10)
    
    return {
        props: {
            products: JSON.parse(JSON.stringify(products))
        }
    }
}