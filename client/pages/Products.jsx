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
      console.log("Products:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      await API.post("/cart", {
        productId,
        quantity: 1,
      });

      alert("Product added to cart successfully!");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Please login first.");
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <h2>Loading Products...</h2>
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
            <div className="col-md-4 mb-4" key={product._id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "250px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x250?text=No+Image";
                  }}
                />

                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>

                  <p className="card-text">
                    {product.description}
                  </p>

                  <h5 className="text-success">
                    ₹{product.price}
                  </h5>

                  <p>
                    <strong>Category:</strong> {product.category}
                  </p>

                  <p>
                    <strong>Stock:</strong> {product.stock}
                  </p>

                  <button
                    className="btn btn-primary w-100"
                    onClick={() => addToCart(product._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h3 className="text-center">No Products Found</h3>
        )}
      </div>
    </div>
  );
}

export default Products;