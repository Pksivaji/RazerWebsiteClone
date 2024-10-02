import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./Main.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  const submitHandler = async (e) => {
    e.preventDefault();
    let valid = true;

    if (email.trim() === "") {
      setErrors((errors) => ({ ...errors, email: "Please enter an email" }));
      valid = false;
    } else if (!emailPattern.test(email)) {
      setErrors((errors) => ({ ...errors, email: "Please enter a valid email" }));
      valid = false;
    } else {
      setErrors((errors) => ({ ...errors, email: "" }));
    }

    if (password.trim() === "") {
      setErrors((errors) => ({ ...errors, password: "Please enter a password" }));
      valid = false;
    } else if (password.length < 8) {
      setErrors((errors) => ({
        ...errors,
        password: "Please enter a password with at least 8 characters",
      }));
      valid = false;
    } else {
      setErrors((errors) => ({ ...errors, password: "" }));
    }

    if (!valid) return;

    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', { email, password });
      alert('Sign Up successful');
      setEmail("");
      setPassword("");
    } catch (error) {
      alert('Sign Up failed');
    }
  };

  return (
    <div className="formCon border d-flex justify-content-center align-items-center bg-black vw-100 vh-100">
      <div className="formDiv justify-content-center align-items-center p-5 border border-success bg-black text-white">
        <h2 className="pe-1">RAZZER ID SIGN UP</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="email" className="">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email please..."
            className="form-control bg-black text-white"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {errors.email && <p className="text-danger">{errors.email}</p>}
          <label htmlFor="password" className=" ">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password please..."
            className="form-control bg-black text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-danger">{errors.password}</p>}
          <p className="" style={{ float: "right", cursor: "pointer" }}>Forget Password</p>
          <center>
            <input type="submit" value="SIGN UP" className="btn btn-success w-100 text-black" />
            <p className="p-1">Already have an Account?</p>
            <Link to="/login">
              <button className="btn btn-primary">LOG IN</button>
            </Link>
          </center>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
