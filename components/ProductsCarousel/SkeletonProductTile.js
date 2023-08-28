import Skeleton from '@mui/material/Skeleton';
import styled from "styled-components"

const ProductTileContainer = styled.div`
    padding: 0.5rem 1.5rem;
    margin: 0.75rem auto 0.75rem auto;
    height: 95%;
    width: 100%;
`

const ProductTileContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`

const ProductInfo = styled.div`
    padding: 0.75rem 0.375rem 0 0.375rem;
    span {
        margin-bottom: 5px;
    }
`
const ProductPrice = styled.div`
    padding: 0.5rem 0.5rem 0 0.375rem;
    font-size: 1.2rem;
    flex-grow: 1;
    display: flex;
    align-items: flex-end;
`

export default function SkeletonProductTile() {

    return (
        <>
            <ProductTileContainer>
                <ProductTileContent>
                    <Skeleton variant="rounded" width={"100%"} height={"100%"}/>
                    <ProductInfo>
                        <Skeleton variant="rounded" width={"100%"} height={30}/>
                        <Skeleton variant="rounded" width={"100%"} height={30}/>
                    </ProductInfo>
                    <ProductPrice>
                        <Skeleton variant="rounded" width={"100%"} height={20}/>
                    </ProductPrice>
                </ProductTileContent>
            </ProductTileContainer>
        </>
    )
}