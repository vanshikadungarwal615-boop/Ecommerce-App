import { Link } from "react-router-dom";

function Admin() {
  return (
    <div className="container mt-5">

      <h1 className="text-center fw-bold mb-5">
        Admin Dashboard
      </h1>

      <div className="row">

        <div className="col-md-6">

          <div className="card shadow mb-4">
            <div className="card-body text-center">

              <h3 className="fw-bold">
                Product Management
              </h3>

              <p>
                Add, Edit and Delete Products
              </p>

              <Link
                to="/admin/products"
                className="btn btn-primary"
              >
                Manage Products
              </Link>

            </div>
          </div>

        </div>

        <div className="col-md-6">

          <div className="card shadow mb-4">
            <div className="card-body text-center">

              <h3 className="fw-bold">
                Order Management
              </h3>

              <p>
                View and Update Orders
              </p>

              <Link
                to="/admin/orders"
                className="btn btn-success"
              >
                Manage Orders
              </Link>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Admin;