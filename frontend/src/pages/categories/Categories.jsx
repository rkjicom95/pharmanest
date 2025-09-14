import React, { useState, useEffect } from "react";
import FAQSection from "../home/FAQSection";
import { useParams } from "react-router-dom";
import { getMedicines } from "../../features/user/medicinesSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Review from "./Review.jsx";
import AddReview from "./AddReview.jsx";

const Categories = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [medicine, setMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { medicines } = useSelector((state) => state.medicine);

  useEffect(() => {
    if (!medicines || medicines.length === 0) {
      dispatch(getMedicines());
    }
  }, [dispatch, medicines]);

  useEffect(() => {
    const med = medicines.find((m) => m._id === id);
    setMedicine(med);
  }, [medicines, id]);

  const discount =
    medicine?.oldPrice > medicine?.price
      ? Math.round(
          ((medicine.oldPrice - medicine.price) / medicine.oldPrice) * 100
        )
      : 0;

  if (!medicine) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
    );
  }

  return (
    <div className="bg-teal-50 min-h-screen px-4 md:px-12 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        Home <span className="mx-1">›</span> Medicines
        <span className="mx-1">›</span>
        <span className="text-teal-600 font-medium">{medicine?.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product Card */}
        <div className="lg:col-span-2 bg-white rounded-lg border p-6">
          <div className="flex w-full justify-between">
            {/* Left: Image */}
            <div className="w-[60%]">
              <img
                src={`http://localhost:8000/uploads/${medicine?.img}`}
                alt={medicine.name}
                className="w-full h-85 object-contain border rounded-lg"
              />
            </div>

            {/* Right: Details */}
            <div className="w-[30%]">
              <h1 className="text-2xl font-semibold text-gray-800 mb-1">
                {medicine?.name}
              </h1>
              <p className="text-gray-500 text-sm mb-1">
                {medicine?.companyName}
              </p>
              <p className="text-gray-600 text-sm mb-4">
                {medicine?.itemDetails}
              </p>

              {/* Price */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl font-bold text-teal-700">
                  ₹{medicine?.price}
                </span>
                {medicine.oldPrice && (
                  <span className="text-gray-400 line-through">
                    ₹{medicine?.oldPrice}
                  </span>
                )}
                {discount > 0 && (
                  <span className="bg-red-50 text-red-600 text-xs px-2 py-1 rounded border border-red-200">
                    {discount}% OFF
                  </span>
                )}
              </div>

              {/* Qty Selector */}
              <div className="flex items-center gap-3 mb-6">
                <label className="font-medium text-gray-700">Qty:</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (e.target.value === "") setQuantity(1);
                    else if (val > 0) setQuantity(val);
                  }}
                  className="w-28 border rounded-md px-3 py-1 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <p className="text-sm text-gray-600 mb-6">
                Delivery by{" "}
                <span className="font-semibold text-gray-800">
                  Tomorrow, before 2:00 pm
                </span>
              </p>
              <button className="bg-teal-600 text-white px-8 py-2 rounded-lg font-medium hover:bg-teal-700 transition">
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
              Get{" "}
              <span className="font-bold text-orange-700">
                {discount > 0 ? `${discount}% OFF` : "No Discount"}
              </span>{" "}
              on selected medicines.
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
              {medicine?.description || "No description available."}
            </p>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-10 mt-12">
        <section className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">
            Key Benefits
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>{medicine?.benefits || "No benefits listed."}</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">
            Dosage Instructions
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {medicine?.dosage || "No dosage instructions provided."}
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-red-600 mb-3 border-b pb-2">
            Warnings
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>{medicine?.warning || "No warnings available."}</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">
            Possible Side Effects
          </h3>
          <div className="bg-red-50 border border-red-200 p-4 rounded-md">
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>{medicine?.sideEffects || "No side effects reported."}</li>
            </ul>
          </div>
        </section>
        <Review setIsModalOpen={setIsModalOpen} />
      </div>

      {isModalOpen && <AddReview onClose={() => setIsModalOpen(false)} />}

      <FAQSection />
    </div>
  );
};

export default Categories;
