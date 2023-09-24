import { useEffect, useState } from "react"
import styled from "styled-components"

const ImageGridContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const MainImage = styled.img`
    max-width: 100%;
    margin: 0.5rem;
    border-radius: 5px;
`

const ImageButtonContainer = styled.div`
    width: 100%;
`

const Image = styled.img`
    width: 100%;
    border-radius: 5px;
    :hover {
        cursor: pointer;
    }
`

const ImageButtons = styled.div`
    display: grid;
    padding: 0rem 0.5rem;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    border-radius: 5px;
    width: 100%;
`

export default function ProductImagesCarousel({images}){

    const [mainImage, setMainImage] = useState(images?.[0])
    
    useEffect(() => {
        setMainImage(images?.[0])
    }, [images])
    
    return (
        <>
            <ImageGridContainer>
                <MainImage src={mainImage} alt="Main product image"/>
                <ImageButtons>
                    {images.map((image, i) => (
                        <ImageButtonContainer key={"image" + i}>
                            <Image src={image} alt="Product image button" onClick={(() => setMainImage(image))}/>
                        </ImageButtonContainer>
                    ))}
                </ImageButtons>
            </ImageGridContainer>
        </>
    )
}