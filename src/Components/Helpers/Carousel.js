import React, { useState } from 'react'
import { CarouselData } from './CarouselData'
import { VscChevronRight, VscChevronLeft  } from "react-icons/vsc";

function Carousel({ slides }) {

    const [currImg, setCurrImg] = useState(0) 
    const length = slides.length

    const nextSlide = () => {
        setCurrImg(currImg === length-1 ? 0 : currImg + 1)
    }

    const prevSlide = () => {
        setCurrImg(currImg === 0 ? length-1  : currImg - 1)
    }

    if(!Array.isArray(slides) || slides.length <= 0) {
        return null
    }

    return (
        <div className='carousel'>
            <VscChevronLeft className="left-arrow" onClick={prevSlide}/>
            <VscChevronRight className="right-arrow" onClick={nextSlide}/>
            {CarouselData.map((slide, index) => {
                return (
                    <div className={index === currImg ? 'slide active': 'slide'} key={index}>
                        {index === currImg && (<img src={slide.img} alt="Pizzia Images" className='image'/>)}
                        
                    </div>
                )
            })}
        </div>
    )
}

export default Carousel