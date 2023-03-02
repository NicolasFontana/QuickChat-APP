import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Logo from "assets/logo-removebg-preview.png";
import ButtonText from "Components/Shared/Button/ButtonText";
import Input from "Components/Shared/Input";
import style from "./index.module.css";

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
});

function Register() {
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
    }
  });

  console.log(errors);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={style.containerForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.brand}>
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
        <Input
          type="email"
          name="email"
          placeholder="Email"
          register={register}
          error={errors.email?.message}
        />
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
  );
}

export default Register;
