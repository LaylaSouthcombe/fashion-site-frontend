import SmallAddToCartBtn from "@/components/SmallAddToCartBtn"
import styled from "styled-components"
import Link from "next/link"

const ProductTile = styled.div`
    padding: 20px;
    margin: 10px auto 10px auto;
    /* width: 80%; */
`

const ProductImage = styled.img`
    border-radius: 5px;
    width: 100%;
`

const ProductBrand = styled.p`
    font-size: 1rem;
`

const ProductInfo = styled.div`
    padding: 5px;
`

const ProductName = styled.p`
    font-size: 0.75rem;
    padding: 3px 0px;
    color: grey;
`

const ProductPrice = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
        padding-left: 5px;
        font-size: 1.2rem;
    }
`

export default function FeaturedProductTile({product:{_id, name, price, brand,  images}}) {
    const url = `/product/${_id}`

    return (
        <>
            <ProductTile>
                <Link href={url}>
                    <ProductImage src={images[0]}/>
                    <ProductInfo>
                        <ProductBrand>{brand}</ProductBrand>
                        <ProductName>{name}</ProductName>
                        <ProductPrice>
                            <p>{price.toLocaleString()}</p>
                            <SmallAddToCartBtn id={_id}/>
                        </ProductPrice>
                    </ProductInfo>
                </Link>
            </ProductTile>
        </>
    )
}