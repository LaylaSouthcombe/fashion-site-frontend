import styled from "styled-components"

const BarWrapper = styled.div`
    width: 50%;
    height: 8px;
    border-radius: 5px;
    background-color: lightgrey;
    margin: 0 auto;
`

const ProgressBar = styled.div`
    width: ${props => props.percentageWidth > 0 ? `${props.percentageWidth + '%'}` : '0%'};
    background-color: var(--main-dark-blue);
    height: 100%;
    border-radius: 5px;
`

export default function CarouselBar({percentageSlideNumber, slideLength}){
    let percentageWidth = percentageSlideNumber === 0 ? 0 : (percentageSlideNumber / (slideLength - 1))*100
    return (
        <>
            <BarWrapper>
                <ProgressBar percentageWidth={percentageWidth}></ProgressBar>
            </BarWrapper>
        </>
    )
}