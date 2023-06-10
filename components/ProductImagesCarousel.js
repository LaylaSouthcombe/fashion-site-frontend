import { useState } from "react"
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
    
    return (
        <>
            <ImageGridContainer>
                <MainImage src={mainImage} alt="" />
                <ImageButtons>
                    {images.map((image, i) => (
                        <ImageButtonContainer key={"image" + i}>
                            <Image src={image} alt="" onClick={(() => setMainImage(image))}/>
                        </ImageButtonContainer>
                    ))}
                </ImageButtons>
            </ImageGridContainer>
        </>
    )
}