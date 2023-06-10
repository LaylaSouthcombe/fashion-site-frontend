import { useState } from "react"
import styled from "styled-components"

const TopSectionContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 90%;
    margin: 0 auto;
`


const ImageGridContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const Image = styled.img`
    max-width: 100%;
    margin: 0.5rem;
    border-radius: 5px;
`

const ImageButtons = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    border-radius: 5px;
`



export default function ProductImagesCarousel({images}){

    const [mainImage, setMainImage] = useState(images?.[0])
    
    return (
        <>
        <TopSectionContainer>
            <ImageGridContainer>
                <Image src={mainImage} alt="" />
                <ImageButtons>
                    {images.map((image, i) => (
                        <div key={"image" + i}>
                            <Image src={image} alt="" onClick={(() => setMainImage(image))}/>
                        </div>
                    ))}
                </ImageButtons>
            </ImageGridContainer>

        </TopSectionContainer>
        </>
    )
}