import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../features/order/orderSlice.js";
import { getUser } from "../../utils/localStorage.js";

const MyOrder = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.order);

  const currentUser = getUser();

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchOrders(currentUser.id));
    }
  }, [dispatch, currentUser?.id]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderStatus = (status) => {
    const statusColors = {
      Processing: "bg-yellow-100 text-yellow-800",
      Delivered: "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${
          statusColors[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  if (!currentUser?.id) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">❌ Please login to see your orders</p>
      </div>
    );
  }

  return (
    <div className="bg-teal-50 min-h-screen">
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold mb-6">My Orders</h2>

        {status === "loading" ? (
          <p className="text-gray-500 text-lg">Loading orders...</p>
        ) : error ? (
          <p className="text-red-500 text-lg">Error: {error}</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500 text-lg">You have no orders yet.</p>
        ) : (
          orders
            .slice()
            .reverse()
            .map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-md rounded-lg border p-6 space-y-4"
              >
                {/* Header: Order ID & Status */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Order ID: {order._id.slice(-6).toUpperCase()}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    {renderStatus(order.status)}
                  </div>
                </div>

                {/* Items Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="py-2 px-3 text-gray-600">Item</th>
                        <th className="py-2 px-3 text-gray-600">Qty</th>
                        <th className="py-2 px-3 text-gray-600">Price</th>
                        <th className="py-2 px-3 text-gray-600">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => (
                        <tr
                          key={item._id || item.productId || item.id}
                          className="border-b last:border-b-0 hover:bg-gray-50 transition"
                        >
                          <td className="py-2 px-3">{item.name}</td>
                          <td className="py-2 px-3">{item.qty}</td>
                          <td className="py-2 px-3">₹{item.price}</td>
                          <td className="py-2 px-3 font-semibold">
                            ₹{item.price * item.qty}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary */}
                <div className="flex justify-end border-t pt-3 mt-3">
                  <p className="font-bold text-lg">
                    Total Payable: ₹{order.totalAmount}
                  </p>
                </div>

                {/* Payment & Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mt-2">
                  <p>
                    <span className="font-semibold">Payment:</span>{" "}
                    {order.payment?.method} ({order.payment?.status})
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {`${order.address.name}, ${order.address.street}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}`}
                  </p>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default MyOrder;
