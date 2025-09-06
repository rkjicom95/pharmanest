import React from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import D1 from "/assets/reviews/d1.jpeg";
import D2 from "/assets/reviews/d2.jpeg";
import D3 from "/assets/reviews/d3.jpeg";
import D4 from "/assets/reviews/d4.jpeg";
import D5 from "/assets/reviews/d5.jpeg";
import D6 from "/assets/reviews/d6.jpeg";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Amit Sharma",
      location: "Delhi, India",
      image: D1,
      review:
        "PharmaNest ki service bahut fast hai. Medicines time se deliver hoti hain aur quality bhi trusted hai.",
      rating: 5,
    },
    {
      id: 2,
      name: "Priya Verma",
      location: "Mumbai, India",
      image: D2,
      review:
        "Bahut easy-to-use website hai. Categories clear hain aur payment process simple hai.",
      rating: 4,
    },
    {
      id: 3,
      name: "Rohit Kumar",
      location: "Bangalore, India",
      image: D3,
      review:
        "Customer support quick aur helpful hai. Mujhe meri medicine ki delivery ke update milte rahe.",
      rating: 5,
    },
    {
      id: 4,
      name: "Sneha Patel",
      location: "Ahmedabad, India",
      image: D4,
      review:
        "Bahut hi reliable service hai. Prices bhi reasonable aur timely delivery bhi.",
      rating: 4,
    },
    {
      id: 5,
      name: "Sonam Rani",
      location: "Noida, India",
      image: D5,
      review:
        "Customer support quick aur helpful hai. Mujhe meri medicine ki delivery ke update milte rahe.",
      rating: 5,
    },
    {
      id: 6,
      name: "Sandeep Tyagi",
      location: "Gurgaon, India",
      image: D6,
      review:
        "Bahut hi reliable service hai. Prices bhi reasonable aur timely delivery bhi.",
      rating: 4,
    },
  ];

  // slick settings
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000, // 3 sec
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640, // mobile
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="w-full lg:px-8 py-3 p-2 bg-teal-50">
      <h2 className="text-[14px] lg:text-lg font-medium text-start mb-6">
        What Our Customers have to Say{" "}
      </h2>

      <Slider {...settings}>
        {reviews.map((item) => (
          <div key={item.id} className="px-3 ">
            <div className="bg-teal-100 p-6 rounded-xl shadow hover:shadow-lg transition h-full">
              {/* Customer Info */}
              <div className="flex items-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.location}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex mb-3">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-600">{item.review}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Testimonials;
