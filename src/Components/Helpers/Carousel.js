import React from 'react'
import { CarouselData } from './CarouselData'

function Carousel() {
    return (
        <div>
            {CarouselData.map((slide, index) => {
                return (
                    <img src={slide.img} alt="Pizzia Images" />
                )
            })}
        </div>
    )
}

export default Carousel