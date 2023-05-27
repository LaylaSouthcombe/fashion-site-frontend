import React, {useState, useEffect} from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import FeaturedProductTile from "@/components/FeaturedProductTile"
import CarouselArrow from "@/components/CarouselArrow"
import styled from "styled-components";

const FeaturedTitle = styled.h2`
    width: 80%;
    margin: 0 auto;
`

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

export default function FeaturedProducts({featuredProducts}) {
    
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

    return (
        <>
            <section>
                <FeaturedTitle>Featured products</FeaturedTitle>
                <CarouselWrapper className="navigation-wrapper">
                    {loaded && instanceRef.current ? (
                        <>
                            <CarouselArrow
                            left
                            onClick={(e) =>
                                e.stopPropagation() || instanceRef.current?.prev()
                            }
                            disabled={currentSlide === 0}
                            />
                        </>
                    ) : null}
                    <CarouselInnerWrapper>
                        <div ref={sliderRef} className="keen-slider">
                            {featuredProducts?.length > 0 ? 
                                featuredProducts.map((product, i) => (
                                    <div key={i} className="keen-slider__slide">
                                        <FeaturedProductTile key={i} product={product}/>
                                    </div>
                                ))
                                : null}
                        </div>
                    </CarouselInnerWrapper>
                    {loaded && instanceRef.current ? (
                        <>
                            <CarouselArrow
                            onClick={(e) =>
                                e.stopPropagation() || instanceRef.current?.next()
                            }
                            disabled={
                                currentSlide ===
                                instanceRef.current.track.details.slides.length - 1
                            }
                            />
                        </>
                    ) : null}
                </CarouselWrapper>
            </section>
        </>
    )
}