import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Logo from "assets/logo-removebg-preview.png";
import ButtonText from "Components/Shared/Button/ButtonText";
import Input from "Components/Shared/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./index.module.css";

const schema = Joi.object({
  username: Joi.string().min(3).max(40).required().messages({
    "string.min": "Username must contain more than 3 letters",
    "string.max": "Username must not contain more than 50 letters",
    "string.empty": "Username is a required field",
  }),
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
  confirmPassword: Joi.string().equal(Joi.ref("password")).messages({
    "any.only": "Passwords don't match",
  }),
  avatarImage: Joi.string().allow("").required(),
});

function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
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
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatarImage: "",
    },
  });

  const onSubmit = async (data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
        avatarImage: data.avatarImage,
      }),
    });
    const user = await response.json();
    if (user.error) {
      toast.error(user.message, {
        position: "bottom-right",
        theme: "dark",
      });
    }
    if (user.error === false) {
      localStorage.setItem("chat-app-user", JSON.stringify(user.data));
      navigate("/setAvatar");
    }
  };

  return (
    <>
      <div className={styles.containerForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.brand}>
            <img src={Logo} alt="Logo QuickChat" />
            <h1>QuickChat</h1>
          </div>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            register={register}
            error={errors.username?.message}
          />
          <Input type="email" name="email" placeholder="Email" register={register} error={errors.email?.message} />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            register={register}
            error={errors.password?.message}
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            register={register}
            error={errors.confirmPassword?.message}
          />
          <ButtonText type={"submit"} label={"Register"} />
          <span>
            Have an account? <Link to="/auth/login">Log in</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Register;
