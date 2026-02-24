import React from 'react'
import Button from '../../../components/Button';
import Slider from "react-slick";
import { sliderimg } from '../../../assets/ConstantData';

const Banner = ({ BannerData }) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280, // large screens
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024, // laptop
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768, // tablet
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // small mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const { imgUrl, heading1, spanText, heading2, smText, btnText } = BannerData;
  return (
    <>
      <div className='bg-[var(--yellow-color)] w-full'>
        <div className="container mx-auto">
          <div className='h-full w-full flex flex-col lg:flex-row justify-around items-center'>
            <div className='h-full lg:w-[40%] order-1 lg:-order-1 mt-5 lg:mt-0'>
              <img src={imgUrl} alt="" />
            </div>
            <div className='flex flex-col justify-center items-start gap-3 -order-1 lg:order-1 mt-[50px] lg:mt-0 p-3 lg:p-0'>
              <div>
                <h1 className='lg:text-8xl text-5xl font-semibold'>{heading1}</h1>
                <span className='lg:text-8xl text-5xl font-semibold text-[#2e83fe]'>{spanText}</span>
                <h1 className='lg:text-8xl text-5xl font-semibold'>{heading2}</h1>
              </div>
              <p className='text-xl'>{smText}</p>
              <Button className="bg-[var(--black-color)] text-[var(--white-color)] py-3 w-[60%] lg:w-[30%] rounded" text={btnText} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-6">
        <Slider {...settings}>
          {sliderimg.map((item, index) => (
            <div key={index} className="flex justify-center items-center px-3">
              <img
                src={item}
                alt="brand"
                className="object-contain"
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
}

export default Banner