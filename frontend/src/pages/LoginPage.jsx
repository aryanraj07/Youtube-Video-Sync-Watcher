import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
const LoginPage = () => {
  const { setAuth } = useAuth();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/login", user, {
        withCredentials: true,
      });
      console.log(res);
      console.log(res.data?.data?.accessToken);

      setAuth({
        user: res.data?.data?.user,
        token: res.data?.data?.accessToken,
      });
      const newAuth = {
        user: res.data?.data?.user,
        token: res.data?.data?.accessToken,
      };
      localStorage.setItem("auth", JSON.stringify(newAuth));

      navigate("/dashboard");
    } catch (err) {
      console.log(err);

      console.log({
        name: err.name,
        message: err.message,
        stack: err.stack,
      });
    }
  };
  return (
    <section className="container">
      <h1>Login Form</h1>
      <form onSubmit={handleLogin} encType="multipart/formdata">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            name="username"
            type="text"
            className="form-control"
            id="username"
            value={user.username}
            onChange={handleChange}
            aria-describedby="username"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="email"
            value={user.email}
            onChange={handleChange}
            aria-describedby="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
