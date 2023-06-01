import styled from "styled-components"
import GridProduct from "./GridProduct"

export default function ProductsGrid({products}) {
    // console.log(featuredProducts)
    // console.log("products grid", products)
    return (
        <div>Featured products
            {products?.length > 0 ? 
                products.map((product, i) => (
                    <GridProduct key={i} product={product}/>
                ))
            : null}
        </div>
    )
}