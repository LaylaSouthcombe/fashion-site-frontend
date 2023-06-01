import styled from "styled-components"

export default function GridProduct({product}) {
    // console.log("grid product", product)
    return (
        <div>
            {product !== undefined ? 
            <p>{product.name}</p>
            : null}
        </div>
    )
}