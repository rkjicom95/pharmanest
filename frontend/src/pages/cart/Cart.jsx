import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCart,
  addToCart,
  removeFromCart,
} from "../../features/cart/cartSlice";
import { getUser } from "../../utils/localStorage.js";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔑 Redux से cart state लाएँ
  const { items, status, error } = useSelector((state) => state.cart);

  // 🟢 User ID
  const currentUser = getUser();
  const userId = currentUser ? currentUser.id : null;

  // 🟢 Cart load करें जब component mount हो
  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [dispatch, userId]);

  // Quantity बदलें
  const handleQtyChange = (item, action) => {
    const newQty = action === "inc" ? item.qty + 1 : Math.max(item.qty - 1, 1);

    // ⬆️ पहले Redux state update → पेज तुरंत बदलता है
    dispatch(
      addToCart({
        userId,
        medicine: { ...item, qty: newQty },
      })
    );
  };

  // Item हटाएँ
  const handleRemove = (medicineId) => {
    dispatch(removeFromCart({ userId, medicineId }));
  };

  // कुल रकम
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Checkout
  const handleCheckout = () => {
    const orderData = { cartItems: items, total };
    localStorage.setItem("checkoutData", JSON.stringify(orderData));
    navigate("/checkout");
  };

  if (status === "loading") return <p className="p-6">Loading cart...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="bg-teal-50 min-h-screen">
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">My Cart</h2>

        {items.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4 bg-white rounded shadow-sm p-4">
              {items.map((item) => (
                <div
                  key={item.medicineId}
                  className="flex flex-col md:flex-row justify-between items-center border rounded p-4 shadow-sm"
                >
                  <div className="flex flex-row gap-8">
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                      <img
                        // src={item.img || "/placeholder.png"}
                        src={`http://localhost:8000/uploads/${item?.img}`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-md">{item.name}</h3>
                      <p className="text-gray-600 mt-1">
                        ₹{item.price} × {item.qty} = ₹{item.price * item.qty}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                    <button
                      onClick={() => handleQtyChange(item, "dec")}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="px-2">{item.qty}</span>
                    <button
                      onClick={() => handleQtyChange(item, "inc")}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemove(item.medicineId)}
                      className="ml-4 text-red-600 hover:underline"
                    >
                      <MdDelete size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mt-6 p-4 border-t border-gray-200 bg-white rounded">
              <h3 className="text-xl font-bold">Total</h3>
              <p className="text-xl font-bold">₹{total}</p>
            </div>

            {/* Checkout */}
            <button
              onClick={handleCheckout}
              className="mt-6 w-full bg-teal-600 text-white py-3 rounded text-lg font-semibold hover:bg-teal-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
