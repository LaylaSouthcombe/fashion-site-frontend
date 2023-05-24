import {SmallAddToCartBtn} from "@/components/SmallAddToCartBtn"
import styled from "styled-components"


const ProductTile = styled.div`
    padding: 10px;
    margin: 10px;
`

const ProductImage = styled.img`
    border-radius: 20px;
    width: 100%;
`

const ProductInfo = styled.div`
    display: flex;
    justify-content: space-between;
`

export default function FeaturedProductTile({_id, name, price, images}) {
    const url = `/product/${_id}`
    
    return (
        <>
        <ProductTile>
            <ProductImage src={images[0]}/>
            <ProductInfo>
                <div>
                    <div>{name}</div>
                    <div>{price}</div>
                </div>
                <SmallAddToCartBtn id={_id}/>
            </ProductInfo>
        </ProductTile>
        </>
    )
}