import React from "react";
import styled from "styled-components";

import ProductsCarousel from "./ProductsCarousel/ProductsCarousel";

const FeaturedTitle = styled.h2`
    width: 80%;
    margin: 0 auto;
`

export default function FeaturedProducts({featuredProducts}) {

    return (
        <>
            <section>
                <FeaturedTitle>Featured products</FeaturedTitle>
                <ProductsCarousel products={featuredProducts}/>
            </section>
        </>
    )
}