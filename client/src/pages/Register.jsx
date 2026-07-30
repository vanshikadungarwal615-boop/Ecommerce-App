import { useState } from "react";

import API from "../services/api";


function Register(){


    const [name,setName] = useState("");

    const [email,setEmail] = useState("");

    const [password,setPassword] = useState("");



    const registerUser = async(e)=>{


        e.preventDefault();


        try{


            const response = await API.post(
                "/auth/register",
                {
                    name,
                    email,
                    password
                }
            );


            alert(
                response.data.message || 
                "Registration Successful"
            );


        }
        catch(error){


            alert(
                error.response.data.message
            );


        }


    };



    return(

        <div className="container mt-5">


            <h2>
                Register
            </h2>


            <form onSubmit={registerUser}>


                <input

                    className="form-control mb-3"

                    placeholder="Name"

                    value={name}

                    onChange={
                        e=>setName(e.target.value)
                    }

                />



                <input

                    className="form-control mb-3"

                    placeholder="Email"

                    value={email}

                    onChange={
                        e=>setEmail(e.target.value)
                    }

                />



                <input

                    className="form-control mb-3"

                    placeholder="Password"

                    type="password"

                    value={password}

                    onChange={
                        e=>setPassword(e.target.value)
                    }

                />



                <button className="btn btn-primary">

                    Register

                </button>


            </form>


        </div>

    );

}


export default Register;