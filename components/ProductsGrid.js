import styled from "styled-components"
import GridProduct from "./GridProduct"

const ProductsGridContainer = styled.section`
    min-height: 100%;
`

export default function ProductsGrid({products}) {
    // console.log(featuredProducts)
    // console.log("products grid", products)
    return (
        <ProductsGridContainer>
            {products?.length > 0 ? 
                products.map((product, i) => (
                    <GridProduct key={i} product={product}/>
                ))
            : null}
        </ProductsGridContainer>
    )
}