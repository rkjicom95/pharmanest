import React from "react";
import { FaUsers, FaMotorcycle, FaPills, FaMapMarkedAlt } from "react-icons/fa";

const WhyChooseUs = () => {
  const stats = [
    {
      icon: <FaUsers className="text-yellow-500 text-5xl mb-3" />,
      number: "46 Million+",
      text: "Registered users as of Oct 31, 2024",
    },
    {
      icon: <FaMotorcycle className="text-green-500 text-5xl mb-3" />,
      number: "66 Million+",
      text: "Orders on PharmaNest till date",
    },
    {
      icon: <FaPills className="text-teal-500 text-5xl mb-3" />,
      number: "60,000+",
      text: "Unique items sold last 6 months",
    },
    {
      icon: <FaMapMarkedAlt className="text-red-500 text-5xl mb-3" />,
      number: "19,000+",
      text: "Pin codes serviced last 3 months",
    },
  ];
  return (
    <section className="w-full  py-3 bg-teal-50">
      <div className="lg:px-8 p-2">
        <h2 className="text-[14px] md:text-lg font-medium text-start text-gray-800 mb-6">
          Why Choose <span className="text-teal-600">PharmaNest?</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-md"
            >
              {/* Background Animation Layer */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-teal-700 to-teal-500 
                      translate-y-full group-hover:translate-y-0 
                      transition-transform duration-700 ease-in-out"
              ></div>

              {/* Content */}
              <div className="relative z-10 p-6 bg-white/90 group-hover:bg-transparent transition-colors duration-500">
                <div className="flex justify-center">
                  <div className="transition-colors duration-500 group-hover:text-white">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-[14px] lg:text-[16px] font-medium text-gray-800 mt-2 transition-colors duration-500 group-hover:text-white">
                  {item.number}
                </h3>
                <p className="text-sm text-gray-600 mt-2 transition-colors duration-500 group-hover:text-gray-200">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
