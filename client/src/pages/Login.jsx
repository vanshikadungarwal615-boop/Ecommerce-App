import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await API.post("/auth/login", {
                email: email,
                password: password
            });

            console.log("LOGIN RESPONSE:", response.data);

            // Save JWT token
            if (response.data.token) {
                localStorage.setItem(
                    "token",
                    response.data.token
                );
            } else {
                alert("Login successful, but no token was received.");
                return;
            }

            // Save user information if backend sends it
            if (response.data.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
            }

            alert("Login Successful!");

            // Go to products page
            navigate("/products");

        } catch (error) {

            console.error("LOGIN ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Login failed. Please check your email and password."
            );

        } finally {

            setLoading(false);

        }
    };


    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="text-center fw-bold mb-4">
                                Login
                            </h2>


                            <form onSubmit={handleLogin}>

                                {/* Email */}

                                <div className="mb-3">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />

                                </div>


                                {/* Password */}

                                <div className="mb-3">

                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />

                                </div>


                                {/* Login Button */}

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >

                                    {loading
                                        ? "Logging in..."
                                        : "Login"}

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;