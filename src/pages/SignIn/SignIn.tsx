import React, { useEffect, useState, createRef } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

import style from "./SignIn.module.css";

import { sha256 } from "js-sha256";
import Signin_image from "./Signin_image.png";

export default function SignIn() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [wrong_password, setWrongPassword] = useState("");
  const [wrong_login, setWrongLogin] = useState("");

  const RefLogin = createRef<HTMLInputElement>(),
    RefPassword = createRef<HTMLInputElement>();

  useEffect(() => {
    const token = localStorage.getItem("JWToken");
    if (token !== null) navigate("/Teams");
  }, []);

  const login = (ev: any) => {
    ev.preventDefault();
    if (RefLogin.current && RefPassword.current) {
      let login = RefLogin.current.value;
      let password = RefPassword.current.value;
      if (login.length > 0) {
        setWrongLogin("");

        if (password.length > 0) {
          setWrongPassword("");
          Toastify({
            text: "Proccessing",
            className: "info",
            style: {
              background: "linear-gradient(to right, #fe8c00, #f83600)",
            },
          }).showToast();

          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              login: login,
              password: sha256(password),
            }),
          };

          fetch("http://dev.trainee.dex-it.ru/api/Auth/SignIn", requestOptions)
            .then((response) => response.json())
            .then((jsonContent) => {
              if (jsonContent.token === undefined)
                Toastify({
                  text: "User with the specified username / password was not found.",
                  className: "info",
                  style: {
                    background: "linear-gradient(to right, #eb3349, #f45c43)",
                  },
                }).showToast();
              else {
                localStorage.setItem("JWToken", jsonContent.token);

                Toastify({
                  text: "Succesfull authentication",
                  className: "info",
                  style: {
                    background: "linear-gradient(to right, #1d976c, #93f9b9)",
                  },
                }).showToast();

                navigate("/Teams");
              }
            });
        } else setWrongPassword("Field can not be empty");
      } else setWrongLogin("Field can not be empty");
    }
  };

  return (
    <div className={style.container_login}>
      <div className={style.image_container}>
        <img src={Signin_image} />
      </div>

      <div className={style.login_input}>
        <form>
          <p className={style.page_title}>Sign In</p>

          <div className={style.inputBox}>
            <label>Login</label>
            <input type="text" ref={RefLogin} />
            <p style={{ color: "red" }}>{wrong_login}</p>
          </div>

          <div className={style.inputBox}>
            <label>Password</label>
            <input type="password" ref={RefPassword} required />
            <p style={{ color: "red" }}>{wrong_password}</p>
          </div>

          <button id={style.button_login} onClick={login}>
            Sign In
          </button>
        </form>
        <p style={{ marginLeft: "15px", marginTop: "15px" }}>
          Not a member yet?
          <a href="/SignUp" style={{ marginLeft: "5px", color: "#E4163A" }}>
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
