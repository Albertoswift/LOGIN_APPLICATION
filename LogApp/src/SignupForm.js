import Axios from 'axios'
import React, { useState, useEffect } from 'react';

function SignupForm() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [Email, setEmail] = useState('')
    const [dateofBirth, setDateofBirth] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')


    const SignUp = () => {
        Axios.post("http://localhost:3001/signup", {
            firstName: firstName,
            lastName: lastName,
            Email: Email,
            userName: userName,
            dateofBirth: dateofBirth,
            phoneNumber: phoneNumber,
            password: password

        }).then(() => {
            alert("successful sign up");
        });
    }









    return (
        <div >
            <form className="signupForm">

                <h1> CREATE AN ACCOUNT </h1>
                <input type="text" placeholder="First Name" name="firstName" onChange={(e) => {
                    setFirstName(e.target.value);
                }} />

                <input type="text" placeholder="Last Name" name="lastName" onChange={(e) => {
                    setLastName(e.target.value);
                }} />

                <input type="email" placeholder="Email" name="Email" onChange={(e) => {
                    setEmail(e.target.value);
                }} />

                <input type="text" placeholder="Username" name="userName" onChange={(e) => {
                    setUserName(e.target.value);
                }} />

                <input type="date" placeholder="Date of Birth" name="dateofBirth" onChange={(e) => {
                    setDateofBirth(e.target.value);
                }} />

                <input type="tel" placeholder="Phone number" name="phoneNumber" onChange={(e) => {
                    setPhoneNumber(e.target.value);
                }} />

                <input type="password" placeholder="Password" onChange={(e) => {
                    setPassword(e.target.value);
                }} />

                <div className="policyBox">
                    <input type="checkbox" /> <p>By checking this box you agree to our privacy policies</p>
                </div>
                <button onClick={SignUp}>SIGN UP</button>
            </form>

        </div>

    )
}

export default SignupForm
