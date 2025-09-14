import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import About1 from "/assets/about/about1.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AboutPharmaNest from "../home/AboutPharmaNest";
import S1 from "/assets/about/s1.jpeg";
import S2 from "/assets/about/s2.jpeg";
import S3 from "/assets/about/s3.jpeg";
import S4 from "/assets/about/s4.jpeg";
import S5 from "/assets/about/s5.jpeg";

// --- Custom Arrows ---
const NextArrow = ({ onClick }) => (
  <button
    className="absolute -right-12 top-1/2 transform -translate-y-1/2 
               bg-teal-600 text-white p-3 rounded-full shadow-lg 
               hover:bg-teal-700 transition z-10"
    onClick={onClick}
  >
    <FaChevronRight size={20} />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute -left-12 top-1/2 transform -translate-y-1/2 
               bg-teal-600 text-white p-3 rounded-full shadow-lg 
               hover:bg-teal-700 transition z-10"
    onClick={onClick}
  >
    <FaChevronLeft size={20} />
  </button>
);

// --- Thumbnail Slider Arrows ---
const ThumbNextArrow = ({ onClick }) => (
  <button
    className="absolute -right-8 top-1/2 transform -translate-y-1/2 
               bg-white text-teal-600 border border-teal-500 p-2 
               rounded-full shadow-md hover:bg-teal-600 hover:text-white 
               transition z-10"
    onClick={onClick}
  >
    <FaChevronRight size={16} />
  </button>
);

const ThumbPrevArrow = ({ onClick }) => (
  <button
    className="absolute -left-8 top-1/2 transform -translate-y-1/2 
               bg-white text-teal-600 border border-teal-500 p-2 
               rounded-full shadow-md hover:bg-teal-600 hover:text-white 
               transition z-10"
    onClick={onClick}
  >
    <FaChevronLeft size={16} />
  </button>
);

const About = () => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const slider1 = useRef(null);
  const slider2 = useRef(null);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);
  return (
    <div className="w-full bg-teal-50 ">
     
      <div className="w-full bg-teal-500 py-14 px-6 text-center">
        <h2 className="text-2xl font-semibold text-white leading-relaxed w-full">
          Our ultimate goal is to provide affordable healthcare to <br />
          one and all.
        </h2>
      </div>
      <div className="w-full bg-teal-50">
        {/* Left Side - Text */}
        <div className="p-4">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Core Values of <span className="text-teal-500">PharmNest</span>
          </h1>
          <p className="text-[16px] text-gray-600 leading-relaxed">
            To further our vision and goals, we came up with the following core
            values. These principles act as the foundation of PharmNest and
            guide every decision we make. They reflect who we are, how we serve
            our customers, and how we shape the future of healthcare. Our values
            drive us to maintain integrity, innovate continuously, and put
            people first. They are highly instrumental in deciding where we want
            to go and how we will get there, ensuring that we remain focused on
            delivering accessible, affordable, and reliable healthcare solutions
            for everyone.
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="flex justify-center items-center">
          <img
            src={About1}
            alt="Core Values"
            className="w-full rounded-lg shadow-lg p-6 object-cover"
          />
        </div>
      </div>
      <div className="p-4">
        <div className="border border-gray-400 p-4 rounded-lg">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            What is <span className="text-teal-500">PharmNest</span> ?
          </h2>

          {/* Subtitle */}
          <p className="italic text-gray-700 mb-4">
            PharmEasy is a consumer healthcare{" "}
            <span className="font-semibold">“super app”</span>.
          </p>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-4xl">
            PharmEasy is a consumer healthcare “super app” that provides
            consumers with on-demand, home delivered access to a wide range of
            prescription, OTC pharmaceutical, other consumer healthcare
            products, comprehensive diagnostic test services, and
            teleconsultations thereby serving their healthcare needs.
          </p>

          {/* Highlighted Text */}
          <p className="text-lg text-teal-500 italic mb-12">
            To change the face of healthcare in India, one consumer at a time.
          </p>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-2xl font-semibold text-teal-500">
                25 Million
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                Registered Users as of Jun 30, 2021
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-teal-500">
                8.8 Million
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                PharmEasy Orders as of FY21
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-teal-500">
                2.4 Million
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                Transacting customers as of FY21
              </p>
            </div>
          </div>
        </div>
      </div>
      <AboutPharmaNest />
      {/* --- Image Slider --- */}
      <div className="slider-container w-[70%] mx-auto py-10 relative">
        <h2 className="text-2xl font-bold text-teal-600 underline mb-6 text-center">
          PharmaNest Image Gallery
        </h2>

        {/* First Slider (Main Images) */}
        <Slider
          asNavFor={nav2}
          ref={slider1}
          arrows={true}
          fade={true}
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
        >
          {[S1, S2, S3, S4, S5].map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-[450px] object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </Slider>

        {/* Second Slider (Thumbnails) */}
        <div className="mt-6 relative">
          <Slider
            asNavFor={nav1}
            ref={slider2}
            slidesToShow={4}
            swipeToSlide={true}
            focusOnSelect={true}
            centerMode={true}
            centerPadding="0px"
            nextArrow={<ThumbNextArrow />}
            prevArrow={<ThumbPrevArrow />}
          >
            {[S1, S2, S3, S4, S5].map((img, index) => (
              <div key={index} className="px-2">
                <img
                  src={img}
                  alt={`Thumb ${index + 1}`}
                  className="h-32 w-full object-cover rounded-md 
                     border-2 border-gray-200 hover:border-teal-500 
                     cursor-pointer transition"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default About;
