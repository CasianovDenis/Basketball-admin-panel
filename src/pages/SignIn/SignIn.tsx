import React, { useEffect, useState, createRef } from "react";
import { useNavigate } from "react-router-dom";

import style from "./SignIn.module.css";

import { sha256 } from "js-sha256";

export default function SignIn() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const RefLogin = createRef<HTMLInputElement>(),
    RefPassword = createRef<HTMLInputElement>();

  useEffect(() => {
    const token = localStorage.getItem("JWToken");
    if (token !== null) navigate("/Workplace");
    // var base64 = token.split(".")[1];
    //var decoded_token = JSON.parse(window.atob(base64));
  }, []);

  const login = (ev: any) => {
    ev.preventDefault();
    if (RefLogin.current && RefPassword.current) {
      let login = RefLogin.current.value;
      let password = RefPassword.current.value;
      if (login.length > 0 && password.length > 0) {
        setMessage("Proccessing");

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
              setMessage("Username or password incorrect");
            else {
              localStorage.setItem("JWToken", jsonContent.token);

              setMessage("Succesfull authentication");
              navigate("/Workplace");
            }
          });
      } else setMessage("Fields can not be empty");
    }
  };

  return (
    <div className={style.container_login}>
      <div>
        <img src="/Images/SignIn_basketball.jpg" id={style.signin_image} />
      </div>

      <div className={style.login_input}>
        <form>
          <p className={style.page_title}>Sign In</p>

          <div className={style.inputBox}>
            <p>Login</p>
            <input type="text" ref={RefLogin} />
          </div>

          <div className={style.inputBox}>
            <p>Password</p>
            <input type="password" ref={RefPassword} required />
          </div>

          <button id={style.button_login} onClick={login}>
            Sign In
          </button>
        </form>
        <p>
          Not a member yet?
          <a href="/SignUp" style={{ marginLeft: "5px", color: "#d33864" }}>
            Sign Up
          </a>
        </p>
        <p>{message}</p>
      </div>
    </div>
  );
}
