import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SampleNextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute right-1 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-teal-700 text-white p-2 rounded-full shadow-lg hover:bg-teal-800"
      onClick={onClick}
    >
      <FaChevronRight size={20} />
    </div>
  );
};

const SamplePrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute left-1 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-teal-700 text-white p-2 rounded-full shadow-lg hover:bg-teal-800"
      onClick={onClick}
    >
      <FaChevronLeft size={20} />
    </div>
  );
};

const Spotlight = () => {
  // Images from assets folder
  const spotlightImages = [
    "/assets/home/h1.png",
    "/assets/home/h2.png",
    "/assets/home/h3.png",
    "/assets/home/h4.png",
    "/assets/home/h6.png",
    "/assets/home/h7.png",
    "/assets/home/h8.png",
    "/assets/home/h9.png",
    "/assets/home/h10.png",
    "/assets/home/h11.png",
  ];
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4, // default large screen
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // tablet and below
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // mobile and below
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  

  return (
    <div className="relative w-full py-3 lg:px-8 p-2 bg-teal-50">
      <h2 className="text-[14px] md:text-lg font-medium text-start text-gray-800 mb-4">
        Spotlight
      </h2>
      <Slider {...settings}>
        {spotlightImages.map((img, index) => (
          <div key={index} className="px-1.5 ">
            <div className="h-46 md:h-56 lg:h-42 rounded-lg shadow-lg overflow-hidden">
              <img
                src={img}
                alt={`spotlight-${index}`}
                className="w-full h-full object-fit hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Spotlight;
