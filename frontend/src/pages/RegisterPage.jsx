import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const [user, setUser] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    avatar: "",
    coverImage: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setUser({ ...user, [name]: files[0] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      console.log(formData);

      Object.entries(user).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const res = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      navigate("/login");
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
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit} encType="multipart/formdata">
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
          <label htmlFor="fullName" className="form-label">
            FullName
          </label>
          <input
            name="fullName"
            type="text"
            className="form-control"
            id="fullName"
            value={user.fullName}
            onChange={handleChange}
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
        <div className="mb-3">
          <label htmlFor="avatar" className="form-label">
            Profile Avatar
          </label>
          <input
            name="avatar"
            type="file"
            className="form-control"
            id="avatar"
            onChange={handleFileChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cover-image" className="form-label">
            Cover Image
          </label>
          <input
            name="coverImage"
            type="file"
            className="form-control"
            id="cover-image"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </section>
  );
};

export default RegisterPage;
