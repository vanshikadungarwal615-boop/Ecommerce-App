import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const loginUser = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            login(
                response.data.user,
                response.data.token
            );

            alert(response.data.message);

            navigate("/");

        }
        catch (error) {

            alert(
                error.response?.data?.message || "Login Failed"
            );

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <h2 className="mb-4">
                        Login
                    </h2>

                    <form onSubmit={loginUser}>

                        <input
                            type="email"
                            className="form-control mb-3"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            className="form-control mb-3"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button
                            className="btn btn-primary w-100"
                            type="submit"
                        >
                            Login
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default Login;