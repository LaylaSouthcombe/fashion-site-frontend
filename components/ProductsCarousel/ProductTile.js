import styled from "styled-components"
import Link from "next/link"

const ProductTileContainer = styled.div`
    padding: 0.5rem 1.5rem;
    margin: 0.75rem auto 0.75rem auto;
    height: 95%;
`

const ProductTileContent = styled(Link)`
    text-decoration: none;
    color: var(--main-dark-blue);
    display: flex;
    flex-direction: column;
    height: 100%;
`

const ProductImage = styled.img`
    border-radius: 5px;
    width: 100%;
    max-width: 100%;
`

const ProductInfo = styled.div`
    padding: 0.75rem 0.375rem 0 0.375rem;
`

const ProductBrand = styled.p`
    font-size: 1rem;
    text-transform: uppercase;
`

const ProductName = styled.p`
    font-size: 0.8rem;
    padding: 0.5rem 0 0 0;
    color: grey;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
            line-clamp: 2; 
    -webkit-box-orient: vertical;
`

const ProductPrice = styled.div`
    padding: 0.5rem 0 0 0.375rem;
    font-size: 1.2rem;
    flex-grow: 1;
    display: flex;
    align-items: flex-end;
`

export default function ProductTile({product:{_id, name, price, brand,  images}}) {
    const url = `/product/${_id}`

    return (
        <>
            <ProductTileContainer>
                <ProductTileContent href={url}>
                    <ProductImage src={images[0]}/>
                    <ProductInfo>
                        <ProductBrand>{brand}</ProductBrand>
                        <ProductName>{name}</ProductName>
                    </ProductInfo>
                    <ProductPrice>£{price.toLocaleString()}</ProductPrice>
                </ProductTileContent>
            </ProductTileContainer>
        </>
    )
}