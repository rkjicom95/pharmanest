import React from "react";
import HomeTop from "/assets/homeTop.png";
import HomeBanner from "/assets/HomeBanner.png";
import { FaTablets } from "react-icons/fa6";
import { FaBaby } from "react-icons/fa";
import { MdLocalHospital } from "react-icons/md";
import { GiMedicinePills, GiPlantSeed } from "react-icons/gi";
import { FaStar } from "react-icons/fa";
import Reviews from "./Reviews";
import AboutPharmaNest from "./AboutPharmaNest";
import FAQSection from "./FAQSection";
import WhyChooseUs from "./WhyChooseUs";
import Spotlight from "./Spotlight";
import products from "../../data/products";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const categories = [
    {
      name: "Tablets",
      icon: <FaTablets className="w-8 h-8 text-teal-600" />,
      bg: "bg-teal-100",
    },
    {
      name: "Syrups",
      icon: <GiMedicinePills className="w-8 h-8 text-orange-500" />,
      bg: "bg-orange-100",
    },
    {
      name: "First Aid",
      icon: <MdLocalHospital className="w-8 h-8 text-green-600" />,
      bg: "bg-green-100",
    },
    {
      name: "Baby Care",
      icon: <FaBaby className="w-8 h-8 text-cyan-600" />,
      bg: "bg-cyan-100",
    },
    {
      name: "Herbal",
      icon: <GiPlantSeed className="w-8 h-8 text-emerald-600" />,
      bg: "bg-emerald-100",
    },
  ];

  const handleShop = () => {
    navigate("/medicines");
  };
  const handleCategory = () => {
    navigate("/categories");
  };
  return (
    <div className="w-full bg-teal-50">
      {/* ================= HERO ================= */}
      <div className="relative w-full">
        {" "}
        {/* Background Image */}{" "}
        <img
          src={HomeTop}
          alt="PharmaNest Top"
          className="w-full h-[250px] md:h-[400px] object-fit rounded"
        />{" "}
        {/* Overlay */}{" "}
        <div className="absolute inset-0 flex flex-row gap-4 mt-28 md:gap-8 lg:ml-70 lg:mt-40 items-center justify-center">
          <button
            onClick={handleShop}
            className="w-fit px-6 py-2 bg-teal-600 hover:bg-teal-700 text-sm text-white font-medium rounded-xl shadow-lg transition"
          >
            Shop Now
          </button>
          <button
            onClick={handleCategory}
            className="w-fit px-6 py-2 hover:bg-teal-700 text-black text-sm hover:text-white border border-teal-600 font-medium rounded-xl shadow-lg transition"
          >
            View Categories
          </button>
        </div>
      </div>
      <section className="w-full lg:px-8 p-2 ">
        <h2 className="text-[14px] lg:text-lg font-medium mb-6">
          Featured Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 ">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center justify-center 
                   p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl 
                   cursor-pointer transform transition-all duration-500 
                   hover:-translate-y-1  hover:rotate-[0deg] 
                   hover:scale-105"
              style={{ perspective: "1000px" }} // 3D depth
            >
              {/* Icon wrapper with 3D spin */}
              <div
                className={`w-14 h-14 flex items-center justify-center rounded-full ${cat.bg} 
                      transform transition-transform duration-500 group-hover:rotate-y-180`}
              >
                {cat.icon}
              </div>

              {/* Text */}
              <p className="mt-4 text-sm text-gray-800 font-medium transition-colors duration-500 group-hover:text-teal-700">
                {cat.name}
              </p>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-teal-200/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </section>
      {/* ================= Popular Medicines ================= */}
      <section className="w-full lg:px-8 py-3 p-2 bg-teal-50">
        <h2 className="text-[14px] lg:text-lg font-medium text-start text-black mb-6">
          Popular Medicines
        </h2>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ">
          {products.map((p) => (
            <div
              key={p.id}
              className="group bg-white rounded-xl shadow transition hover:shadow-xl p-4 text-center "
            >
              {/* Image with flip animation */}
              <div className="mx-auto mb-4 w-32 h-32 [perspective:1000px]">
                <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front image */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="absolute inset-0 w-full h-full object-contain [backface-visibility:hidden]"
                  />
                  {/* Back image (same img, palti effect ke liye) */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="absolute inset-0 w-full h-full object-contain rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden]"
                  />
                </div>
              </div>

              {/* Product name */}
              <h3 className="text-sm font-medium text-gray-800">{p.name}</h3>
              {/* Details */}
              <p className="text-gray-600 font-normal text-xs mt-2 ">
                {p.details}
              </p>
            </div>
          ))}
        </div>
      </section>
      <Spotlight />
      <WhyChooseUs />
      <div className="relative w-full lg:p-8 p-2 flex items-center justify-center bg-teal-100">
        {/* Background Banner */}
        <img
          src={HomeBanner}
          alt="PharmaNest Top"
          className="w-full h-[250px] md:h-[400px] object-cover rounded-lg"
        />

        {/* Center Text with 3D Effect */}
        <div className="absolute text-center">
          <h1
            className="text-lg md:text-6xl font-extrabold text-white 
               drop-shadow-[4px_4px_6px_rgba(0,0,0,0.7)]
               tracking-wide relative"
          >
            <span className="bg-gradient-to-r from-teal-400 via-green-400 to-emerald-500 bg-clip-text text-transparent">
              PharmaNest
            </span>
          </h1>
          <p
            className="mt-3 max-w-xl mx-auto text-sm md:text-lg text-gray-200 font-medium 
               drop-shadow-[2px_2px_4px_rgba(0,0,0,0.6)]"
          >
            Delivering health, medicines, and wellness products right at your
            doorstep. Trusted by thousands of families for safe, affordable, and
            timely healthcare essentials.
          </p>
        </div>
      </div>
      <Reviews />
      <AboutPharmaNest />
      <FAQSection />
    </div>
  );
};

export default Home;
