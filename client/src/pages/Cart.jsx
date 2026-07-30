import { useEffect, useState } from "react";
import API from "../services/api";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await API.get("/cart");
      setCartItems(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load cart.");
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      await API.delete(`/cart/${cartId}`);
      alert("Item removed from cart");
      fetchCart();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to remove item.");
    }
  };

  const placeOrder = async () => {
    try {
      await API.post("/orders");
      alert("Order placed successfully!");
      fetchCart();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to place order.");
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="container mt-5">
        <h2>Loading Cart...</h2>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="fw-bold text-center mb-4">My Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <h4 className="text-center">Your cart is empty.</h4>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="card mb-3 shadow-sm" key={item._id}>
              <div className="row g-0">

                <div className="col-md-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="img-fluid rounded-start"
                    style={{
                      height: "200px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="col-md-9">
                  <div className="card-body">

                    <h4 className="fw-bold">
                      {item.product.name}
                    </h4>

                    <p>{item.product.description}</p>

                    <h5 className="text-success">
                      ₹{item.product.price}
                    </h5>

                    <p>
                      <strong>Quantity:</strong> {item.quantity}
                    </p>

                    <button
                      className="btn btn-danger"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>

                  </div>
                </div>

              </div>
            </div>
          ))}

          <div className="card mt-4 shadow">
            <div className="card-body text-center">

              <h3 className="fw-bold">
                Grand Total
              </h3>

              <h2 className="text-success">
                ₹{totalPrice}
              </h2>

              <button
                className="btn btn-success btn-lg mt-3"
                onClick={placeOrder}
              >
                Place Order
              </button>

            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;