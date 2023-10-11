import { memo } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import loginSchema from "../schemas/LoginSchema";
import { PASSWORD, TOKEN } from "../constants/loginDetails";

import userLogin from "../assets/images/user-login.svg";
import passwordLogin from "../assets/images/password-login.svg";
import cartLogin from "../assets/images/cart-login.svg";

import "./Login.css";

const LoginPage = ({ setIsLogin }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,

    onSubmit: async (values) => {
      try {
        if (values.password === PASSWORD) {
          let res = await axios.post("https://reqres.in/api/login", values);
          setIsLogin(true);
          navigate("/");
          localStorage.setItem(TOKEN, res.data.token);
        } else {
          toast.error("Password not found");
        }
      } catch (err) {
        toast.error("User not found");
      }
    },
  });

  return (
    <section id="login">
      <div className="container form-container">
        <img src={cartLogin} alt="Cart" />
        <form onSubmit={formik.handleSubmit} className="form">
          <div className="login-item">
            <img className="login-img" src={userLogin} alt="Email" />
            <input
              className="login-input"
              id="email"
              type="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="error-message">{formik.errors.email}</p>
            ) : null}
          </div>
          <div className="login-item">
            <img className="login-img" src={passwordLogin} alt="Password" />
            <input
              id="password"
              className="login-input"
              type="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="error-message">{formik.errors.password}</p>
            ) : null}
          </div>
          <button className="submit-btn" type="submit">
            login
          </button>
        </form>
      </div>
    </section>
  );
};

LoginPage.propTypes = {
  setIsLogin: PropTypes.func,
};

const MemoLoginPage = memo(LoginPage);

export default MemoLoginPage;
