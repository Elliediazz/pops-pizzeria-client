import React, { useState } from 'react'
import { CarouselData } from './CarouselData'
import { faArrowAltCircleRight, faArrowAltCircleLeft } from 'react-icons/fa'

function Carousel({ slides }) {

    const [currImg, setCurrImg] = useState(0) 
    const length = slides.length

    return (
        <div className='carousel'>
            <faArrowAltCircleLeft className="left-arrow" />
            <faArrowAltCircleRight className="right-arrow" />
            {CarouselData.map((slide, index) => {
                return (
                    <img src={slide.img} alt="Pizzia Images" />
                )
            })}
        </div>
    )
}

export default Carousel