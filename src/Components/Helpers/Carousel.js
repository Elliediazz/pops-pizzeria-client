import React, { useState } from 'react';
import { CarouselData } from './CarouselData';
import { VscChevronRight, VscChevronLeft } from "react-icons/vsc";

function Carousel({ slides }) {
  const [currImg, setCurrImg] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    const newCurrImg = currImg + 1 >= length ? 0 : currImg + 1;
    setCurrImg(newCurrImg);
  };

  const prevSlide = () => {
    const newCurrImg = currImg - 1 < 0 ? length - (length % 4) : currImg - 1;
    setCurrImg(newCurrImg);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div className='carousel-page'>
      <div className='carousel'>
        <VscChevronLeft className="left-arrow" onClick={prevSlide} />
        <VscChevronRight className="right-arrow" onClick={nextSlide} />
        <div className='slides-container'>
          {slides.slice(currImg, currImg + 3).map((slide, index) => (
            <div
              className={index === 1 ? 'slide active' : 'slide'}
              key={index}
            >
              <img
                src={slide.img}
                alt="Pizza Images"
                className={index !== 1 ? 'image inactive' : 'image'}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return <Carousel slides={CarouselData} />;
}