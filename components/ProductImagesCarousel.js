import { useState } from "react"
import styled from "styled-components"

const Image = styled.img`
    max-width: 100%;
`

const ImageButtons = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`



export default function ProductImagesCarousel({images}){

    const [mainImage, setMainImage] = useState(images?.[0])
    
    return (
        <>
        <div style={{width: '300px'}}>
            <Image src={mainImage} alt="" />
            <ImageButtons>
                {images.map(image => (
                    <div>
                        <Image src={image} alt="" onClick={(() => setMainImage(image))}/>
                    </div>
                ))}
            </ImageButtons>
        </div>
        </>
    )
}