import React from "react";
import Logo from "../../../assets/logo.png";
import style from "./index.module.css";

function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("form");
  };

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <img src={Logo} alt="Logo QuickChat" />
          <h1>QuickChat</h1>
        </div>
        <input type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e)} />
        <input type="email" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="Password" />
        <input type="password" placeholder="Confirm password" name="confirmPassword" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
