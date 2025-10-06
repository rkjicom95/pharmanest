import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../../utils/localStorage.js";
import { updateOrder } from "../../features/order/orderSlice.js";
import { clearCart, clearCartAsync } from "../../features/cart/cartSlice.js"; // 👈
import { showError, showSuccess } from "../../utils/toastMessage.js";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderInfo = JSON.parse(localStorage.getItem("orderInfo")) || {};
  const { checkoutData, selectedAddress, createdOrder } = orderInfo;

  const [payment, setPayment] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // ✅ Validate payment input
  const isPaymentValid = () => {
    if (!payment) return false;
    if (payment === "UPI") return !!upiId;
    if (payment === "Card")
      return cardDetails.cardNumber && cardDetails.expiry && cardDetails.cvv;
    return true;
  };

  const handlePlaceOrder = async () => {
    const currentUser = getUser();
    if (!currentUser?.id) {
      showError("Please login first!");
      return navigate("/login");
    }

    if (!isPaymentValid()) {
      return showError(" Please select valid payment method");
    }

    try {
      // 🟢 Update order payment status
      if (createdOrder?._id) {
        await dispatch(
          updateOrder({
            orderId: createdOrder._id,
            status: payment === "COD" ? "Processing" : "Paid",
          })
        ).unwrap();
      }

      // 🟣 Clear cart (backend + frontend)
      await dispatch(clearCartAsync(currentUser.id)); // backend DB empty
      dispatch(clearCart()); // redux state empty

      // 🟢 Clear localStorage
      localStorage.removeItem("checkoutData");
      localStorage.removeItem("orderInfo");

      showSuccess("Order placed successfully!");
      navigate("/myorder");
    } catch (err) {
      console.error("Payment failed:", err);
      showError("Failed to process payment");
    }
  };

  if (!checkoutData || !selectedAddress) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">
          No order information found. Please go back to checkout.
        </p>
        <button
          onClick={() => navigate("/checkout")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go to Checkout
        </button>
      </div>
    );
  }

  return (
    <div className="bg-teal-50 min-h-screen">
      <div className="p-6 max-w-2xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold">Payment</h2>

        {/* Payment Options */}
        <section className="border rounded p-4 space-y-4 bg-white">
          <h3 className="font-semibold">Choose Payment Method</h3>
          {["COD", "UPI", "Card"].map((method) => (
            <label key={method} className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value={method}
                checked={payment === method}
                onChange={(e) => setPayment(e.target.value)}
              />
              {method === "COD"
                ? "Cash on Delivery"
                : method === "UPI"
                ? "UPI / Netbanking"
                : "Debit / Credit Card"}
            </label>
          ))}

          {payment === "UPI" && (
            <input
              type="text"
              className="w-full border rounded p-2 mt-2"
              placeholder="Enter UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          )}

          {payment === "Card" && (
            <div className="space-y-2 mt-2">
              <input
                type="text"
                className="w-full border rounded p-2"
                placeholder="Card Number"
                value={cardDetails.cardNumber}
                onChange={(e) =>
                  setCardDetails({
                    ...cardDetails,
                    cardNumber: e.target.value,
                  })
                }
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  className="w-1/2 border rounded p-2"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="w-1/2 border rounded p-2"
                  placeholder="CVV"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                />
              </div>
            </div>
          )}
        </section>

        {/* Order Summary */}
        <section className="border rounded p-4 bg-white">
          <h3 className="font-semibold mb-2">Order Summary</h3>
          <p className="text-sm text-gray-600 mb-2">
            Deliver to: <strong>{selectedAddress.name}</strong>,{" "}
            {selectedAddress.street}, {selectedAddress.city},{" "}
            {selectedAddress.state} - {selectedAddress.pincode}
          </p>
          <div className="flex justify-between font-bold">
            <span>Total Payable</span>
            <span>₹{checkoutData.total}</span>
          </div>
        </section>

        {/* Place Order */}
        <button
          disabled={!isPaymentValid()}
          onClick={handlePlaceOrder}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:bg-gray-400"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Payment;
