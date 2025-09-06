import React, { useState } from "react";
import FAQSection from "../home/FAQSection";

const Categories = () => {
  const [quantity, setQuantity] = useState(1);
  const [reviews] = useState([
    { id: 1, name: "Rohit", rating: 5, text: "Very effective medicine!" },
    {
      id: 2,
      name: "Sneha",
      rating: 4,
      text: "Works well, but slight stomach irritation.",
    },
    { id: 3, name: "Amit", rating: 5, text: "Affordable and reliable." },
  ]);

  return (
    <div className="bg-teal-50 min-h-screen px-4 md:px-12 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        Home <span className="mx-1">›</span> Medicines
        <span className="mx-1">›</span>
        <span className="text-teal-600 font-medium">Ecosprin 75mg</span>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product Card */}
        <div className="lg:col-span-2 bg-white rounded-lg border p-6">
          <div className="flex w-full justify-between">
            {/* Left: Images */}
            <div className="w-[60%]">
              <img
                src="/assets/med1.png"
                alt="Ecosprin 75 Tablet"
                className="w-full h-full object-contain border rounded-lg"
              />
              {/* Thumbnails */}
              {/* <div className="flex gap-3 mt-4">
                {[1, 2].map((i) => (
                  <img
                    key={i}
                    src={`/assets/med${i}.png`}
                    alt={`Thumbnail ${i}`}
                    className="w-20 h-20 object-contain border rounded-md cursor-pointer hover:border-teal-500 transition"
                  />
                ))}
              </div> */}
            </div>

            {/* Right: Product Details */}
            <div className="w-[30%]">
              <h1 className="text-2xl font-semibold text-gray-800 mb-1">
                Ecosprin 75 Tablet
              </h1>
              <p className="text-gray-500 text-sm mb-1">By USV PVT LTD</p>
              <p className="text-gray-600 text-sm mb-4">
                14 Tablet(s) in Strip
              </p>

              {/* Price */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl font-bold text-teal-700">₹4.28</span>
                <span className="text-gray-400 line-through">₹5.49</span>
                <span className="bg-red-50 text-red-600 text-xs px-2 py-1 rounded border border-red-200">
                  22% OFF
                </span>
              </div>

              {/* Qty Selector */}
              <div className="flex items-center gap-3 mb-6">
                <label className="font-medium text-gray-700">Qty:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border rounded-md px-3 py-1 focus:ring-2 focus:ring-teal-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              </div>

              {/* Delivery */}
              <p className="text-sm text-gray-600 mb-6">
                Delivery by{" "}
                <span className="font-semibold text-gray-800">
                  Tomorrow, before 2:00 pm
                </span>
              </p>

              {/* CTA */}
              <button className="bg-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-700 transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar - Offers */}
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-orange-100 to-orange-50 border border-orange-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-orange-800 mb-2">
              Special Offer 🎉
            </h3>
            <p className="text-sm text-gray-700">
              Get <span className="font-bold text-orange-700">27% OFF</span> on
              selected medicines.
            </p>
            <button className="mt-4 text-sm text-white bg-orange-600 px-4 py-2 rounded-md hover:bg-orange-700 transition">
              View All Offers
            </button>
          </div>
          {/* Description */}
          <div className="mt-10 bg-white p-6 rounded-lg shadow-sm border max-w-4xl">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              Ecosprin 75 tablet is a medication that helps prevent heart
              attacks, strokes, and angina. It is also used in patients who have
              had angioplasty. The active ingredient is low-dose aspirin.
              Aspirin slows down blood clotting by preventing platelets from
              sticking to each other, thereby reducing the risk of clots.
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-10 mt-12">
        {/* ✅ Key Benefits */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">
            Key Benefits
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Helps prevent heart attacks, strokes, and angina.</li>
            <li>Contains low-dose aspirin for safe, long-term use.</li>
            <li>Improves blood flow by reducing clot formation.</li>
            <li>Recommended after angioplasty or bypass surgery.</li>
          </ul>
        </section>

        {/* ✅ Dosage Instructions */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">
            Dosage Instructions
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Take <span className="font-semibold">one tablet daily</span> or as
            directed by your physician. Swallow the tablet whole with water,
            preferably after meals to avoid stomach irritation.
          </p>
        </section>

        {/* ✅ Warnings */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-red-600 mb-3 border-b pb-2">
            Warnings
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Not recommended for children below 12 years.</li>
            <li>Avoid alcohol consumption during medication.</li>
            <li>
              Consult your doctor if you have stomach ulcers or bleeding issues.
            </li>
            <li>Inform your doctor if you are pregnant or breastfeeding.</li>
          </ul>
        </section>

        {/* ✅ Side Effects */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">
            Possible Side Effects
          </h3>
          <div className="bg-red-50 border border-red-200 p-4 rounded-md">
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Nausea or vomiting</li>
              <li>Stomach irritation or heartburn</li>
              <li>Mild dizziness</li>
              <li>Rarely: allergic reactions such as rash or swelling</li>
            </ul>
          </div>
        </section>

        {/* ✅ Customer Reviews */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">
            Customer Reviews
          </h3>

          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 py-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-700">{review.name}</h4>
                <div className="flex text-yellow-400">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-1">{review.text}</p>
            </div>
          ))}

          {/* Add Review Button */}
          <button className="mt-4 bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700 transition">
            Write a Review
          </button>
        </section>
      </div>
      <FAQSection />
    </div>
  );
};

export default Categories;
