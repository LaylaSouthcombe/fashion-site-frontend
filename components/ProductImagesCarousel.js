import styled from "styled-components"

export default function ProductImagesCarousel({images}){
    
    const Image = styled.img`
        max-width: 100%;
    `
    const ImageButtons = styled.div`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    `
    return (
        <>
        <div style={{width: '300px'}}>
            <Image src={images?.[0]} alt="" />
            <ImageButtons>
                {images.map(image => (
                    <div>
                        <Image src={image} alt="" />
                    </div>
                ))}
            </ImageButtons>
        </div>
        </>
    )
}