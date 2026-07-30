function ProductCard({ product, onAddToCart }) {
  return (
    <div className="card h-100 shadow">

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

      <div className="card-body d-flex flex-column">

        <h5>
            className="card-title"
            style={{
            minHeight: "50px",
            fontWeight: "bold"
           }}
       
           {product.name}
        </h5>

        <p className="card-text">
          {product.description}
        </p>

        <p className="mb-1">
          <strong>Category:</strong> {product.category}
        </p>

        <p className="mb-1">
          <strong>Stock:</strong> {product.stock}
        </p>

        <h4 className="text-success mb-3">
          ₹{product.price}
        </h4>

        <button
          className="btn btn-primary mt-auto"
          onClick={() => onAddToCart(product._id)}
        >
          Add to Cart
        </button>

      </div>

    </div>
  );
}

export default ProductCard;