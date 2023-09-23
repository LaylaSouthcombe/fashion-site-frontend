import React from "react";
import styled from "styled-components";

import ProductsCarousel from "./ProductsCarousel/ProductsCarousel";

const FeaturedProductsSection = styled.section`
    width: 90%;
    max-width: 1200px;
    margin: 2rem auto 4rem auto;
`

const FeaturedTitle = styled.h2`
    width: 80%;
    margin: 0 auto;
`

export default function FeaturedProducts({featuredProducts}) {

    return (
        <>
            <FeaturedProductsSection>
                <FeaturedTitle>Featured products</FeaturedTitle>
                <ProductsCarousel products={featuredProducts}/>
            </FeaturedProductsSection>
        </>
    )
}