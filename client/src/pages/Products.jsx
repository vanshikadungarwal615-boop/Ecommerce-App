import { useEffect, useState } from "react";
import API from "../services/api";

function Products() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {

        try {

            const response = await API.get("/products");

            console.log("PRODUCTS:", response.data);

            setProducts(response.data);

        } catch (error) {

            console.error("FETCH PRODUCTS ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Failed to fetch products."
            );

        } finally {

            setLoading(false);

        }
    };


    const addToCart = async (productId) => {

        try {

            // Check login token first
            const token = localStorage.getItem("token");

            if (!token) {

                alert("Please login first.");

                return;
            }


            console.log("Adding product:", productId);

            const response = await API.post("/cart", {

                productId: productId,

                quantity: 1

            });


            console.log(
                "ADD TO CART RESPONSE:",
                response.data
            );


            alert("Product added to cart successfully!");

        } catch (error) {

            console.error(
                "ADD TO CART ERROR:",
                error
            );


            if (error.response?.status === 401) {

                alert(
                    "Your login session has expired. Please login again."
                );

            } else {

                alert(
                    error.response?.data?.message ||
                    "Failed to add product to cart."
                );

            }

        }
    };


    if (loading) {

        return (

            <div className="container mt-5">

                <h2>
                    Loading Products...
                </h2>

            </div>

        );

    }


    return (

        <div className="container mt-5">

            <h1 className="fw-bold text-center mb-4">
                All Products
            </h1>


            <div className="row">

                {products.length > 0 ? (

                    products.map((product) => (

                        <div
                            className="col-md-4 mb-4"
                            key={product._id}
                        >

                            <div className="card h-100 shadow-sm">

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


                                <div className="card-body">

                                    <h5 className="card-title">
                                        {product.name}
                                    </h5>


                                    <p className="card-text">
                                        {product.description}
                                    </p>


                                    <h5 className="text-success">
                                        ₹{product.price}
                                    </h5>


                                    <p>
                                        <strong>
                                            Category:
                                        </strong>{" "}
                                        {product.category}
                                    </p>


                                    <p>
                                        <strong>
                                            Stock:
                                        </strong>{" "}
                                        {product.stock}
                                    </p>


                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={() =>
                                            addToCart(
                                                product._id
                                            )
                                        }
                                    >
                                        Add to Cart
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))

                ) : (

                    <h3 className="text-center">
                        No Products Found
                    </h3>

                )}

            </div>

        </div>

    );
}

export default Products;