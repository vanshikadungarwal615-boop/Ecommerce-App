import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await API.get("/orders/myorders");
      setOrders(response.data.orders);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <h2>Loading Orders...</h2>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <h1 className="fw-bold text-center mb-4">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <h3 className="text-center">
          No Orders Found
        </h3>
      ) : (
        orders.map((order) => (
          <div
            className="card shadow mb-4"
            key={order._id}
          >
            <div className="card-body">

              <h4 className="fw-bold">
                Order ID
              </h4>

              <p>{order._id}</p>

              <hr />

              <h5 className="fw-bold">
                Products
              </h5>

              {order.items.map((item) => (
                <div
                  className="card mb-3"
                  key={item._id}
                >
                  <div className="row g-0">

                    <div className="col-md-3">

                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="img-fluid rounded-start"
                        style={{
                          height: "180px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />

                    </div>

                    <div className="col-md-9">

                      <div className="card-body">

                        <h5 className="fw-bold">
                          {item.product.name}
                        </h5>

                        <p>
                          {item.product.description}
                        </p>

                        <h6 className="text-success">
                          ₹{item.product.price}
                        </h6>

                        <p>
                          <strong>Quantity:</strong>{" "}
                          {item.quantity}
                        </p>

                      </div>

                    </div>

                  </div>
                </div>
              ))}

              <hr />

              <h4 className="text-success">
                Total Price : ₹{order.totalPrice}
              </h4>

              <h5>
                Status :
                <span className="badge bg-primary ms-2">
                  {order.status}
                </span>
              </h5>

              <p className="mt-3">
                <strong>Ordered On :</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>

            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;