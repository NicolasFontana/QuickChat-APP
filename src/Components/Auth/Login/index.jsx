import React, { useEffect } from "react";
import styles from "./index.module.css";
import Logo from "assets/logo-removebg-preview.png";
import Input from "Components/Shared/Input";
import ButtonText from "Components/Shared/Button/ButtonText";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const schema = Joi.object({
  email: Joi.string()
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid email format",
      "string.empty": "Email is a required field",
    }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*?[a-zA-Z])(?=.*?[0-9])(?!.*[^a-zA-Z0-9])/)
    .required()
    .messages({
      "string.min": "Password must contain at least 8 characters",
      "string.pattern.base": "Password must contain both letters and numbers",
      "string.empty": "Password is a required field",
    }),
});

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      return navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: joiResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const user = await response.json();
    if (user.error) {
      return toast.error(user.message, {
        position: "bottom-right",
        theme: "dark",
      });
    }
    if (user.error === false) {
      localStorage.setItem("token", JSON.stringify(user.data.token));
      return navigate("/");
    }
  };

  return (
    <div className={styles.containerForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.brand}>
          <img src={Logo} alt="Logo QuickChat" />
          <h1>QuickChat</h1>
        </div>
        <Input type="email" name="email" placeholder="Email" register={register} error={errors.email?.message} />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          register={register}
          error={errors.password?.message}
        />
        <ButtonText type={"submit"} label={"Login"} />
        <span>
          Don't have an account? <Link to="/auth/register">Register</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
