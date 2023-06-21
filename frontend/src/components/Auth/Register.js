import React, { useContext, useEffect, useState } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import { Navigate } from "react-router-dom";

const Register = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { setAlert } = useContext(AlertContext);
  const { register, error, clearErrors, isAuthenticated } =
    useContext(AuthContext);

  useEffect(() => {
    if (error) {
      setAlert(error, "danger");
      clearErrors();
    }
  }, [error, isAuthenticated]); // eslint-disable-line

  const { name, email, password, password2 } = user;

  const handleChange = (e) => {
    setUser((prevUser) => {
      return { ...prevUser, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = [];
    if (!name || !(name && name.trim())) {
      setAlert("Name is required!", "danger");
      errors.push("username error");
    }
    if (!email || !(email && email.trim())) {
      setAlert("Email is required!", "danger");
      errors.push("email error");
    }
    if (!password || !(password && password.trim())) {
      setAlert("Password is required!", "danger");
      errors.push("password error");
    }
    if (password !== password2) {
      setAlert("password and password2 must match", "danger");
      errors.push("password match error");
    }

    if (errors.length > 0) return;
    register(user);
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Password2</label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={password2}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
