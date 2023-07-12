import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = props => {
    const navigate = useNavigate();
    const loginUser = (email, password) => {
        fetch('http://localhost:3000/server/login', 
            {
                method: 'POST', 
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({email: email, password: password})
            })
        .then((response) => {
            const jsonResponse = response.json();
            //Successful Login
            if(jsonResponse){
                navigate('/anotherPath')
            //Failed Login
            } else {
                navigate('/anotherPath')
            }
            });
    }
    const google = () => {
        window.open("http://localhost:3000/server/oauth/google", "_self");
    }

    return(
        <div className="login-container">
            {/*Logo - NEED LOGO!!!*/}
            <img src="#" alt="Yeti Trips Logo" />

            <h1>Login</h1>

            {/*Email Input*/}
            <label htmlFor="email" className="login-label" placeholder="Email">Email</label>
            <input type="text" id="loginEmail" name="email" className="login-input"/>
            <br /><br />

            {/*Password Input*/}
            <label htmlFor="password" className="login-label" placeholder="Password">Password</label>
            <input type="text" id="loginPassword" name="password" className="login-input"/>
            <br /><br />

            {/*Login Buttons*/}
            <button className="login-button" onClick={() => loginUser(document.querySelector('#loginEmail').value, document.querySelector('#loginPassword').value)}>Login</button>

            {/* NEED LINK!!! */}
            <button className="login-button" onClick={google}>Sign in with Google</button>
            <br /><br />
            
           {/*Forgot Password Link - NEED LINK!!! */}     
            <a href="#" className="login-link">Forgot password?</a>

            {/*Signup Link*/}   
            <Link to="/signup" className="login-link">Signup</Link>
        </div>
    );
}

export default Login;