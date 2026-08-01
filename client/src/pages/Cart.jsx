import { useEffect, useState } from "react";
import API from "../services/api";

function Cart() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await API.get("/cart");

            console.log("CART RESPONSE:", response.data);

            if (Array.isArray(response.data)) {
                setCart(response.data);
            } else if (Array.isArray(response.data.items)) {
                setCart(response.data.items);
            } else if (Array.isArray(response.data.cart)) {
                setCart(response.data.cart);
            } else {
                setCart([]);
            }

        } catch (error) {
            console.error("FETCH CART ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Failed to fetch cart."
            );

        } finally {
            setLoading(false);
        }
    };


    // Remove CART ITEM using cart item's _id
    const removeFromCart = async (cartItemId) => {
        try {
            console.log("Removing cart item:", cartItemId);

            if (!cartItemId) {
                alert("Cart item ID is missing.");
                return;
            }

            await API.delete(`/cart/${cartItemId}`);

            alert("Product removed from cart.");

            fetchCart();

        } catch (error) {
            console.error("REMOVE CART ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Failed to remove product."
            );
        }
    };


    if (loading) {
        return (
            <div className="container mt-5">
                <h2>Loading Cart...</h2>
            </div>
        );
    }


    return (
        <div className="container mt-5">

            <h1 className="text-center fw-bold mb-4">
                My Cart
            </h1>


            {cart.length === 0 ? (

                <div className="alert alert-info text-center">
                    Your cart is empty.
                </div>

            ) : (

                <div className="row">

                    {cart.map((item) => {

                        const product = item.product;


                        // Handle cart items whose product no longer exists
                        if (!product) {
                            return (
                                <div
                                    className="col-md-4 mb-4"
                                    key={item._id}
                                >
                                    <div className="card h-100 shadow-sm">

                                        <div className="card-body">

                                            <h5 className="card-title">
                                                Product No Longer Available
                                            </h5>

                                            <button
                                                className="btn btn-danger w-100"
                                                onClick={() =>
                                                    removeFromCart(item._id)
                                                }
                                            >
                                                Remove
                                            </button>

                                        </div>

                                    </div>
                                </div>
                            );
                        }


                        const price = Number(product.price) || 0;
                        const quantity = Number(item.quantity) || 0;
                        const total = price * quantity;


                        return (

                            <div
                                className="col-md-4 mb-4"
                                key={item._id}
                            >

                                <div className="card h-100 shadow-sm">

                                    {product.image && (
                                        <img
                                            src={product.image}
                                            className="card-img-top"
                                            alt={product.name}
                                            style={{
                                                height: "250px",
                                                objectFit: "cover"
                                            }}
                                            onError={(e) => {
                                                e.target.src =
                                                    "https://via.placeholder.com/300x250?text=No+Image";
                                            }}
                                        />
                                    )}


                                    <div className="card-body">

                                        <h5 className="card-title">
                                            {product.name}
                                        </h5>


                                        <p className="card-text">
                                            {product.description}
                                        </p>


                                        <p>
                                            <strong>
                                                Price:
                                            </strong>{" "}
                                            ₹{price}
                                        </p>


                                        <p>
                                            <strong>
                                                Quantity:
                                            </strong>{" "}
                                            {quantity}
                                        </p>


                                        <p>
                                            <strong>
                                                Total:
                                            </strong>{" "}
                                            ₹{total}
                                        </p>


                                        <button
                                            className="btn btn-danger w-100"
                                            onClick={() =>
                                                removeFromCart(item._id)
                                            }
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            </div>

                        );

                    })}

                </div>

            )}

        </div>
    );
}

export default Cart;