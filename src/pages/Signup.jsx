import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const createUser = (firstName, lastName, email, password) => {
        fetch('http://localhost:3000/server/signup', 
            {
                method: 'POST', 
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(
                    {
                        firstName: firstName,
                        lastName: lastName,
                        email: email, 
                        password: password})
            })
        .then((response) => {
            const jsonResponse = response.json();
            //Successful Signup
            if(jsonResponse){
                navigate('/anotherPath')
            //Failed Signup
            } else {
                navigate('/anotherPath')
            }
            });
    }

    return(
        <div className="signup-container">
            {/*Logo - NEED LOGO IMAGE!!! */}
            <img src="#" alt="Yeti Trips Logo" />

            <h1>Sign Up</h1>

            {/*First Name Input*/}
            <label htmlFor="firstName" className="signup-label" placeholder="First Name">First Name</label>
            <input type="text" id="signupFName" name="firstName" className="signup-input"/>
            <br /><br />

            {/*Last Name Input*/}
            <label htmlFor="lastName" className="signup-label" placeholder="Last Name">Last Name</label>
            <input type="text" id="signupLName" name="lastName" className="signup-input"/>
            <br /><br />

            {/*Email Input*/}
            <label htmlFor="email" className="signup-label" placeholder="Email">Email</label>
            <input type="text" id="signupEmail" name="email" className="signup-input"/>
            <br /><br />

            {/*Password Input*/}
            <label htmlFor="password" className="signup-label" placeholder="Password">Password</label>
            <input type="text" id="signupPassword" name="password" className="signup-input"/>
            <br /><br />
            
            {/*Signup Buttons*/}
            <button className="signup-button" onClick={() => createUser(document.querySelector('#signupFName').value, document.querySelector('#signupLName').value, document.querySelector('#signupEmail').value, document.querySelector('#signupPassword').value)}>Sign Up</button>

            {/* NEED ROUTE!!! */}
            <button className="signup-button" onClick={() => props}>Sign up with Google</button>
        </div>
    );
}

export default Signup;