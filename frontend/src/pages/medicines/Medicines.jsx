import React, { useState } from "react";
import AboutPharmaNest from "../home/AboutPharmaNest";

const medicines = [
  {
    id: 1,
    name: "Paracetamol",
    price: 50,
    img: "/assets/med1.png",
    category: "Tablets",
  },
  {
    id: 2,
    name: "Cough Syrup",
    price: 120,
    img: "/assets/med2.png",
    category: "Syrups",
  },
  {
    id: 3,
    name: "Vitamin C",
    price: 300,
    img: "/assets/med3.png",
    category: "Vitamins",
  },
  {
    id: 4,
    name: "Pain Relief Gel",
    price: 150,
    img: "/assets/med4.png",
    category: "Skincare",
  },
  {
    id: 5,
    name: "Crocin",
    price: 60,
    img: "/assets/med5.png",
    category: "Tablets",
  },
  {
    id: 6,
    name: "Insulin Injection",
    price: 500,
    img: "/assets/med6.png",
    category: "Injections",
  },
  {
    id: 7,
    name: "Moisturizer",
    price: 250,
    img: "/assets/med7.png",
    category: "Skincare",
  },
  {
    id: 8,
    name: "Liver Tonic",
    price: 220,
    img: "/assets/med8.png",
    category: "Syrups",
  },
  {
    id: 9,
    name: "Antibiotic Tablet",
    price: 180,
    img: "/assets/med9.png",
    category: "Tablets",
  },
  {
    id: 10,
    name: "Vitamin B12",
    price: 320,
    img: "/assets/med10.png",
    category: "Injections",
  },
  {
    id: 11,
    name: "Protein Powder",
    price: 900,
    img: "/assets/med11.png",
    category: "Vitamins",
  },
  {
    id: 12,
    name: "Thermometer",
    price: 150,
    img: "/assets/med12.png",
    category: "Equipment",
  },
  {
    id: 13,
    name: "BP Monitor",
    price: 1200,
    img: "/assets/med13.png",
    category: "Equipment",
  },
  {
    id: 14,
    name: "Oximeter",
    price: 800,
    img: "/assets/med14.png",
    category: "Equipment",
  },
  {
    id: 15,
    name: "Aloe Vera Gel",
    price: 180,
    img: "/assets/med15.png",
    category: "Personal Care",
  },
  {
    id: 16,
    name: "Ayurvedic Chyawanprash",
    price: 350,
    img: "/assets/med16.png",
    category: "Ayurvedic",
  },
  {
    id: 17,
    name: "Baby Lotion",
    price: 220,
    img: "/assets/med17.png",
    category: "Baby Care",
  },
  {
    id: 18,
    name: "First Aid Kit",
    price: 500,
    img: "/assets/med18.png",
    category: "First Aid",
  },
  {
    id: 19,
    name: "Dental Floss",
    price: 90,
    img: "/assets/med19.png",
    category: "Dental Care",
  },
];

// 🔹 Reusable Category Component
const MedicineCategory = ({ title, items }) => {
  const [visibleCount, setVisibleCount] = useState(1); // default 4 items show

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div className=" bg-teal-50">
      <h2 className="text-[14px] lg:text-lg font-medium mb-4">{title}</h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.slice(0, visibleCount).map((med) => {
          // Example discount calculation (you can pass oldPrice in data)
          const oldPrice = med.oldPrice || Math.round(med.price * 1.2); // 20% higher fake MRP
          const discount = Math.round(
            ((oldPrice - med.price) / oldPrice) * 100
          );

          return (
            <div
              key={med.id}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center text-center hover:shadow-lg transition relative"
            >
              {/* 🔹 Discount Badge */}
              {discount > 0 && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                  {discount}% OFF
                </span>
              )}

              {/* 🔹 Product Image */}
              <img
                src={med.img}
                alt={med.name}
                className="h-28 object-contain mb-3"
              />

              {/* 🔹 Product Name */}
              <h3 className="mt-1 font-medium text-sm lg:text-base line-clamp-2">
                {med.name}
              </h3>

              {/* 🔹 Price Section */}
              <div className="mt-2">
                <p className="text-gray-400 text-sm line-through">
                  ₹{oldPrice}
                </p>
                <p className="text-lg font-semibold text-teal-600">
                  ₹{med.price}
                </p>
              </div>

              {/* 🔹 Add to Cart */}
              <button className="mt-3 w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm font-medium transition">
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>

      {/* View More Button */}
      {visibleCount < items.length && (
        <div className="flex justify-end mt-4">
          <button
            onClick={handleViewMore}
            className="text-teal-700 hover:text-teal-800 hover:underline text-[14px] lg:text-[15px] font-medium"
          >
            View More
          </button>
        </div>
      )}
      <hr className="my-4 border-gray-300" />
    </div>
  );
};

const Medicines = () => {
  // 🔹 Unique categories auto-generate
  const categories = [...new Set(medicines.map((m) => m.category))];

  return (
    <div className="bg-teal-50 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left: Title */}
        <h3 className="text-xl font-semibold text-teal-500">All Medicines</h3>

        {/* Right: Search Bar */}
        <div className="flex w-full md:w-auto">
          <input
            type="text"
            placeholder="Search medicines..."
            className="flex-1 md:w-60 px-3 py-2 border border-gray-300 rounded-l-lg outline-none focus:ring-0 focus:ring-teal-500"
          />
          <button className="bg-teal-600 text-white px-4 py-2 rounded-r-lg hover:bg-teal-700 transition">
            Search
          </button>
        </div>
      </div>
      <hr className="my-4 border-gray-300" />
      <div>
        {categories.map((cat) => (
          <MedicineCategory
            key={cat}
            title={cat}
            items={medicines.filter((m) => m.category === cat)}
          />
        ))}
        <AboutPharmaNest />
      </div>
    </div>
  );
};

export default Medicines;
