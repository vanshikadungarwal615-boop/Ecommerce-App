import { useEffect, useState } from "react";
import API from "../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await API.get("/orders");

      console.log("Orders API Response:", response.data);

      // Backend returns { count, orders }
      setOrders(response.data.orders || []);

    } catch (error) {
      console.error("Fetch Orders Error:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);

        alert(
          error.response.data?.message ||
          `Failed to fetch orders. Status: ${error.response.status}`
        );
      } else if (error.request) {
        alert(
          "No response from backend. Make sure your backend is running on port 5000."
        );
      } else {
        alert(error.message || "Failed to fetch orders");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}`, {
        status: status,
      });

      alert("Order Status Updated Successfully");

      fetchOrders();

    } catch (error) {
      console.error("Update Status Error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to update order status"
      );
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <h2 className="text-center">
          Loading Orders...
        </h2>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <h1 className="text-center fw-bold mb-4">
        Order Management
      </h1>

      {orders.length === 0 ? (

        <div className="alert alert-info text-center">
          No orders found.
        </div>

      ) : (

        <div className="table-responsive">

          <table className="table table-bordered table-hover shadow">

            <thead className="table-dark">

              <tr>

                <th>
                  Order ID
                </th>

                <th>
                  Products
                </th>

                <th>
                  Total Price
                </th>

                <th>
                  Status
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {orders.map((order) => (

                <tr key={order._id}>

                  <td>
                    {order._id}
                  </td>

                  <td>

                    {order.items?.map((item) => (

                      <div
                        key={item._id}
                        className="mb-2"
                      >

                        <strong>
                          Product:
                        </strong>{" "}

                        {typeof item.product === "object"
                          ? item.product.name
                          : item.product}

                        <br />

                        <strong>
                          Quantity:
                        </strong>{" "}

                        {item.quantity}

                      </div>

                    ))}

                  </td>

                  <td>
                    ₹{order.totalPrice}
                  </td>

                  <td>

                    <select
                      className="form-select"
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(
                          order._id,
                          e.target.value
                        )
                      }
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Processing">
                        Processing
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                    </select>

                  </td>

                  <td>

                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        updateStatus(
                          order._id,
                          order.status
                        )
                      }
                    >
                      Update
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}

export default AdminOrders;