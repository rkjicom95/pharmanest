import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import AboutPharmaNest from "../home/AboutPharmaNest";
import { getMedicines } from "../../features/user/medicinesSlice";
import { useNavigate } from "react-router-dom";
const calculateDiscount = (price, oldPrice) => {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
};

const MedicineCategory = ({ title, items }) => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(6);

  const handleViewMore = () => setVisibleCount((prev) => prev + 6);

  return (
    <section
      aria-labelledby={`category-${title}`}
      className="bg-teal-50 mb-10 p-2 sm:p-4 rounded-lg"
    >
      <h2
        id={`category-${title}`}
        className="text-base sm:text-lg font-semibold mb-4 text-teal-700"
      >
        {title}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items
          .slice(0, visibleCount)
          .map(({ _id, img, name, price, oldPrice }) => {
            const effectiveOldPrice = oldPrice || Math.round(price * 1.2);
            const discount = calculateDiscount(price, effectiveOldPrice);

            return (
              <article
                key={_id}
                className="relative bg-white rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 hover:scale-[1.03] transition duration-300 ease-in-out flex flex-col items-center text-center p-4"
              >
                {discount > 0 && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md shadow z-10">
                    {discount}% OFF
                  </span>
                )}
                <img
                  src={`http://localhost:8000/uploads/${img}`}
                  alt={name}
                  className="h-24 sm:h-28 object-contain mb-3 drop-shadow-md"
                />
                <h3 className="font-medium text-sm sm:text-base text-gray-800 line-clamp-2">
                  {name}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm line-through">
                  ₹{effectiveOldPrice}
                </p>
                <p className="text-teal-600 font-bold text-lg sm:text-xl">
                  ₹{price}
                </p>
                <button
                  type="button"
                  aria-label={`View details for ${name}`}
                  className="absolute bottom-2 left-2 right-2 w-[90%] px-3 py-1.5 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-lg text-xs sm:text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
                  onClick={() => navigate(`/categories/${_id}`)}
                >
                  Details
                </button>
              </article>
            );
          })}
      </div>

      {visibleCount < items.length && (
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleViewMore}
            className="text-teal-700 hover:underline text-sm sm:text-base"
            aria-label={`View more items in ${title}`}
          >
            View More
          </button>
        </div>
      )}
    </section>
  );
};

const Medicines = () => {
  const dispatch = useDispatch();
  const { medicines, loading, error } = useSelector((state) => state.medicine);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getMedicines());
  }, [dispatch]);

  const filteredMedicines = useMemo(() => {
    return medicines.filter((m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [medicines, searchTerm]);

  const categories = useMemo(() => {
    return [...new Set(filteredMedicines.map((m) => m.category))];
  }, [filteredMedicines]);

  if (loading) return <p className="text-center mt-10">Loading medicines...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-600">Error: {error}</p>;

  return (
    <main className="bg-teal-50 min-h-screen p-4 sm:p-6">
      <header className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-teal-600 drop-shadow-sm">
          All Medicines
        </h3>
        <div className="flex w-full md:w-auto">
          <input
            type="search"
            aria-label="Search medicines"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 md:w-60 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-0 focus:ring-teal-400 text-sm sm:text-base"
          />
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="bg-gradient-to-r from-teal-600 to-teal-500 text-white px-4 py-2 rounded-r-lg hover:from-teal-500 hover:to-teal-400 transition text-sm sm:text-base"
            aria-label="Clear search"
          >
            Clear
          </button>
        </div>
      </header>

      <hr className="my-4 border-gray-300" />

      {categories.length > 0 ? (
        categories.map((cat) => (
          <MedicineCategory
            key={cat}
            title={cat}
            items={filteredMedicines.filter((m) => m.category === cat)}
          />
        ))
      ) : (
        <p className="text-center text-gray-600">No medicines found.</p>
      )}

      <AboutPharmaNest />
    </main>
  );
};

export default Medicines;
