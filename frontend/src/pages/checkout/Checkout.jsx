import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../../features/address/addressSlice.js";
import { createOrder } from "../../features/order/orderSlice.js";
import { getUser } from "../../utils/localStorage.js";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addresses, status, error } = useSelector((state) => state.address);

  // Cart & Pricing
  const [checkoutData, setCheckoutData] = useState({
    cartItems: [],
    subtotal: 0,
    discount: 0,
    deliveryCharges: 0,
    total: 0,
  });

  // Selected Address
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressForm, setAddressForm] = useState({
    name: "",
    mobile: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });

  // Load Cart + Fetch Addresses
  useEffect(() => {
    try {
      const savedCart =
        JSON.parse(localStorage.getItem("checkoutData")) || null;
      if (savedCart) {
        const subtotal = savedCart.cartItems.reduce(
          (sum, item) => sum + item.price * item.qty,
          0
        );
        const total =
          subtotal -
          (savedCart.discount || 0) +
          (savedCart.deliveryCharges || 0);
        setCheckoutData({ ...savedCart, subtotal, total });
      }

      const currentUser = getUser();
      if (currentUser?.id) {
        dispatch(fetchAddresses(currentUser.id));
      }
    } catch (err) {
      console.error("Failed to load cart", err);
    }
  }, [dispatch]);

  // Save Address
  const handleSaveAddress = () => {
    const currentUser = getUser();
    if (!currentUser?.id) {
      alert("❌ Please login first!");
      return;
    }

    if (
      !addressForm.name ||
      !addressForm.mobile ||
      !addressForm.street ||
      !addressForm.city ||
      !addressForm.state ||
      !addressForm.pincode
    ) {
      alert("❌ Please fill all required fields");
      return;
    }

    const payload = { ...addressForm, userId: currentUser.id };

    if (addressForm._id) {
      dispatch(updateAddress({ id: addressForm._id, updates: payload }));
    } else {
      dispatch(addAddress(payload));
    }

    setShowAddressModal(false);
    setAddressForm({
      name: "",
      mobile: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
    });
  };

  // Proceed to Payment
  // const handleProceedToPayment = () => {
  //   if (!selectedAddress) {
  //     return alert("❌ Please select a delivery address");
  //   }

  //   // Save selectedAddress + orderSummary in localStorage
  //   localStorage.setItem(
  //     "orderInfo",
  //     JSON.stringify({ checkoutData, selectedAddress })
  //   );

  //   navigate("/payment");
  // };

  // Proceed to Payment
  const handleProceedToPayment = () => {
    if (!selectedAddress) {
      return alert("❌ Please select a delivery address");
    }

    const currentUser = getUser();
    if (!currentUser?.id) {
      return alert("❌ Please login first!");
    }

    // ✅ Prepare order payload
    const orderPayload = {
      userId: currentUser.id,
      items: checkoutData.cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        qty: item.qty,
        _id: item._id,
      })),
      totalAmount: checkoutData.total,
      address: selectedAddress,
      payment: { method: "COD", status: "Pending" },
    };

    // ✅ Dispatch order creation
    dispatch(createOrder(orderPayload))
      .unwrap()
      .then((res) => {
        console.log("Order created:", res);

        // ✅ Save info for Payment page (UI use karega)
        localStorage.setItem(
          "orderInfo",
          JSON.stringify({
            checkoutData, // 👈 Total, cart items etc.
            selectedAddress, // 👈 Delivery address
            createdOrder: res, // 👈 Backend se order response bhi store kar lo (optional)
          })
        );

        navigate("/payment"); // order ke baad payment page
      })
      .catch((err) => {
        console.error("Order failed:", err);
        alert("❌ Failed to create order");
      });
  };

  return (
    <div className="bg-teal-50">
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold">Checkout</h2>

        {/* Delivery Address */}
        <section className="border rounded p-4 bg-white">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Delivery Address</h3>
            <button
              className="text-blue-600 underline"
              onClick={() => {
                setAddressForm({});
                setShowAddressModal(true);
              }}
            >
              + Add New
            </button>
          </div>

          {status === "loading" ? (
            <p>Loading addresses...</p>
          ) : addresses.length > 0 ? (
            <div className="space-y-2">
              {addresses.map((addr) => (
                <div
                  key={addr._id}
                  className={`p-2 border rounded cursor-pointer ${
                    selectedAddress?._id === addr._id
                      ? "border-blue-500 bg-blue-50"
                      : ""
                  }`}
                  onClick={() => setSelectedAddress(addr)}
                >
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="selectedAddress"
                      checked={selectedAddress?._id === addr._id}
                      onChange={() => setSelectedAddress(addr)}
                    />
                    <div>
                      <p>
                        <strong>{addr.name}</strong> | {addr.mobile}
                      </p>
                      <p>
                        {addr.street}, {addr.city}, {addr.state} -{" "}
                        {addr.pincode}
                      </p>
                      {addr.landmark && <p>Landmark: {addr.landmark}</p>}
                    </div>
                  </label>

                  <div className="flex gap-3 mt-2">
                    <button
                      className="text-blue-600 underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAddressForm(addr);
                        setShowAddressModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(deleteAddress(addr._id));
                        if (selectedAddress?._id === addr._id)
                          setSelectedAddress(null);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No address added yet</p>
          )}
        </section>

        {/* Order Summary */}
        <section className="border rounded p-4 bg-white">
          <h3 className="font-semibold mb-2">Order Summary</h3>
          {checkoutData.cartItems.map((item, i) => (
            <div key={item._id || i} className="flex justify-between mb-2">
              <span>
                {item.name} × {item.qty}
              </span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}
          <div className="border-t mt-2 pt-2 space-y-1">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{checkoutData.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>₹{checkoutData.discount || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span>₹{checkoutData.deliveryCharges || 0}</span>
            </div>
            <div className="flex justify-between font-bold mt-2">
              <span>Total Payable</span>
              <span>₹{checkoutData.total}</span>
            </div>
          </div>
        </section>

        {/* Proceed to Payment */}
        <button
          disabled={!selectedAddress}
          onClick={handleProceedToPayment}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:bg-gray-400"
        >
          Proceed to Payment
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        {/* Address Modal */}
        {showAddressModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded p-6 w-96 max-w-full space-y-2">
              <h3 className="font-semibold mb-2">
                {addressForm._id ? "Edit Address" : "Add Address"}
              </h3>
              {["name", "mobile", "street", "city", "state", "pincode"].map(
                (field) => (
                  <input
                    key={field}
                    className="w-full border rounded p-2"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={addressForm[field] || ""}
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        [field]: e.target.value,
                      })
                    }
                  />
                )
              )}
              <input
                className="w-full border rounded p-2"
                placeholder="Landmark (optional)"
                value={addressForm.landmark || ""}
                onChange={(e) =>
                  setAddressForm({
                    ...addressForm,
                    landmark: e.target.value,
                  })
                }
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  className="px-4 py-2 bg-gray-200 rounded"
                  onClick={() => setShowAddressModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={handleSaveAddress}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
