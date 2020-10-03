import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function LoginForm() {

    const [usernameLogin, setLoginUsername] = useState("");
    const [passwordLogin, setLoginPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState("");

    Axios.defaults.withCredentials = true;


    const LoginNow = () => {

        Axios.post("http://localhost:3001/login", {

            userName: usernameLogin,
            password: passwordLogin

        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message)
            } else {
                setLoginStatus(response.data[0].userName)
            }

        });

    };

    //** Need this for non local databases because username stays even with refresh */
    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.loggedIn == true) {
                setLoginStatus(response.data.user[0].userName);
            }
        });
    }, []);








    return (
        <div>

            <form className="loginForm">
                <h1>LOGIN</h1>
                <input type="text" placeholder="Username" name="userName" onChange={(e) => {
                    setLoginUsername(e.target.value);
                }} />

                <input type="password" placeholder="Password" onChange={(e) => {
                    setLoginPassword(e.target.value);
                }} />

                <button onClick={LoginNow}> Login </button>

                <h1> {loginStatus} </h1>

            </form>



        </div>
    );
}

export default LoginForm
