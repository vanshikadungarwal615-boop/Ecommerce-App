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

      setOrders(response.data);

    } catch (error) {

      console.error(error);

      alert("Failed to fetch orders");

    } finally {

      setLoading(false);

    }

  };



  const updateStatus = async (id, status) => {

    try {

      await API.put(`/orders/${id}`, {
        status
      });


      alert("Order Status Updated");


      fetchOrders();


    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to update status"
      );

    }

  };



  if (loading) {

    return (

      <div className="container mt-5">

        <h2>
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


        {orders.map((order)=>(


          <tr key={order._id}>


            <td>

              {order._id}

            </td>



            <td>


              {order.items.map((item)=>(


                <div key={item._id}>

                  Product ID:
                  {item.product}

                  <br/>

                  Quantity:
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

                onChange={(e)=>
                  updateStatus(
                    order._id,
                    e.target.value
                  )
                }

              >

                <option>
                  Pending
                </option>

                <option>
                  Processing
                </option>

                <option>
                  Shipped
                </option>

                <option>
                  Delivered
                </option>


              </select>


            </td>



            <td>


              <button

                className="btn btn-primary"

                onClick={()=>
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

  );

}


export default AdminOrders;