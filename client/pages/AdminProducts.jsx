import { useEffect, useState } from "react";
import API from "../services/api";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const editProduct = (product) => {
    setEditingId(product._id);

    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      stock: product.stock,
    });

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/products/${editingId}`, formData);

        alert("Product Updated Successfully");
      } else {
        await API.post("/products", formData);

        alert("Product Added Successfully");
      }

      setEditingId(null);

      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        stock: "",
      });

      setShowForm(false);

      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || "Operation Failed");
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${id}`);

      alert("Product Deleted Successfully");

      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || "Delete Failed");
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
        Product Management
      </h1>

      <button
        className="btn btn-success mb-4"
        onClick={() => {
          setShowForm(!showForm);

          if (showForm) {
            setEditingId(null);

            setFormData({
              name: "",
              description: "",
              price: "",
              image: "",
              category: "",
              stock: "",
            });
          }
        }}
      >
        {showForm ? "Close Form" : "Add Product"}
      </button>

      {showForm && (

        <form
          onSubmit={saveProduct}
          className="card shadow p-4 mb-5"
        >

          <h3 className="fw-bold mb-4">

            {editingId ? "Edit Product" : "Add Product"}

          </h3>

          <div className="mb-3">

            <label className="form-label fw-bold">
              Product Name
            </label>

            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label fw-bold">
              Description
            </label>

            <textarea
              className="form-control"
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label fw-bold">
              Price
            </label>

            <input
              type="number"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label fw-bold">
              Image URL
            </label>

            <input
              type="text"
              className="form-control"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label fw-bold">
              Category
            </label>

            <input
              type="text"
              className="form-control"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label fw-bold">
              Stock
            </label>

            <input
              type="number"
              className="form-control"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />

          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            {editingId ? "Update Product" : "Save Product"}
          </button>

        </form>

      )}
       
       <table className="table table-bordered table-hover shadow">

  <thead className="table-dark">
    <tr>
      <th>Name</th>
      <th>Category</th>
      <th>Price</th>
      <th>Stock</th>
      <th>Image</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>

    {products.map((product) => (

      <tr key={product._id}>

        <td>{product.name}</td>

        <td>{product.category}</td>

        <td>₹{product.price}</td>

        <td>{product.stock}</td>

        <td>
          <img
            src={product.image}
            alt={product.name}
            width="80"
            height="80"
            style={{
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </td>

        <td>

          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => editProduct(product)}
          >
            Edit
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteProduct(product._id)}
          >
            Delete
          </button>

        </td>

      </tr>

    ))}

  </tbody>

</table>
      

    </div>
  );
}

export default AdminProducts;