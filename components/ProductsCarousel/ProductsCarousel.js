import React, {useState} from "react";
import styled from "styled-components";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import ProductTile from "@/components/ProductsCarousel/ProductTile"
import CarouselArrow from "@/components/ProductsCarousel/CarouselArrow"
import CarouselBar from "@/components/ProductsCarousel/CarouselBar"

const CarouselWrapper = styled.div`
    width: 90%;
    margin: 0 auto; 
    align-items: center;
    display: flex;
`

const CarouselInnerWrapper = styled.div`
    position: relative;
    width: 90%;
    margin: 0 auto;
`

export default function ProductsCarousel({products}){
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
        slides: {
            perView: 1,
            spacing: 10
        },
        centered: false,
        loop: false,
        mode: "snap",
        breakpoints: {
            "(min-width: 550px)": {
                slides: {
                    perView: 2,
                    spacing: 10
                  }
            },
            "(min-width: 850px)": {
                slides: {
                    perView: 3,
                    spacing: 10
                  }
            }
        }
    })
    
    const [percentageSlideNumber, setPercentageSlideNumber] = useState(0)
    
    const increasePercentage = () => {
        if(currentSlide <
            instanceRef.current.track.details.slides.length - instanceRef.current.options.slides.perView){
            setPercentageSlideNumber(prev => prev += 1)
        }
    }

    const decreasePercentage = () => {
        if(currentSlide !== 0){
            setPercentageSlideNumber(prev => prev -= 1)
        }
    }

    const slideRightAndIncreaseProgress = (e) => {
        e.stopPropagation() || instanceRef.current?.next()
        increasePercentage()
    }

    const slideLeftAndDecreaseProgress = (e) => {
        e.stopPropagation() || instanceRef.current?.prev()
        decreasePercentage()
    }

    return (
        <>
            <CarouselWrapper className="navigation-wrapper">
                {loaded && instanceRef.current ? (
                    <>
                        <CarouselArrow
                        left
                        onClick={(e) =>
                            slideLeftAndDecreaseProgress(e)
                        }
                        disabled={currentSlide === 0}
                        />
                    </>
                ) : null}
                <CarouselInnerWrapper>
                    <div ref={sliderRef} className="keen-slider">
                        {products?.length > 0 ? 
                            products.map((product, i) => (
                                <div key={i} className="keen-slider__slide">
                                    <ProductTile key={i} product={product}/>
                                </div>
                            ))
                            : null}
                    </div>
                </CarouselInnerWrapper>
                {loaded && instanceRef.current ? (
                    <>
                        <CarouselArrow
                        onClick={(e) =>
                            slideRightAndIncreaseProgress(e)
                        }
                        disabled={
                            currentSlide >=
                            instanceRef.current.track.details.slides.length - instanceRef.current.options.slides.perView
                            }
                        />
                    </>
                ) : null}
            </CarouselWrapper>
            {loaded && instanceRef.current ? (
                <CarouselBar percentageSlideNumber={percentageSlideNumber} slideLength={instanceRef.current.track.details.slides.length - instanceRef.current.options.slides.perView + 1}/>
            ) : null}
        </>
    )
}