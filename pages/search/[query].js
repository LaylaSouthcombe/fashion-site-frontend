import { useEffect } from "react"
import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"
import ProductTile from "@/components/ProductsCarousel/ProductTile"
import styled from "styled-components"


const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
`

export default function SearchResults({products}) {
    console.log(products)
    return (
        <>
            <ProductGrid>
                {products !== undefined ? 
                    products.map((product, i) => {
                        return (
                            <ProductTile product={product} key={"productTile" + i}/>
                        )
                    })
                : 
                null}
            </ProductGrid>
        </>
        
    )
}

export async function getServerSideProps(context){
    await mongooseConnect()
    console.log({query: context.query})
    const {query} = context.query
    console.log(query.replace("-", " "))
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