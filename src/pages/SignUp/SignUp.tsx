import React, { useState, useEffect, createRef } from "react";
import { sha256 } from "js-sha256";
import { useNavigate } from "react-router-dom";

import style from "./SignUp.module.css";

export default function SignUp() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [accept_agreement, setAcceptAgreement] = useState(false);

  const refName = createRef<HTMLInputElement>(),
    refPassword = createRef<HTMLInputElement>(),
    refLogin = createRef<HTMLInputElement>(),
    refVerificationPassword = createRef<HTMLInputElement>();

  useEffect(() => {
    const token = localStorage.getItem("JWToken");
    if (token !== null) navigate("/Teams");
  }, []);

  const create_account = (ev: any) => {
    ev.preventDefault();
    if (
      refPassword.current &&
      refLogin.current &&
      refName.current &&
      refVerificationPassword.current
    ) {
      let name = refName.current.value;
      let password = refPassword.current.value;
      let login = refLogin.current.value;
      let verification_password = refVerificationPassword.current.value;
      if (
        name.length > 0 &&
        login.length > 0 &&
        password.length > 0 &&
        verification_password.length > 0
      ) {
        if (accept_agreement === true) {
          if (password === verification_password) {
            setMessage("Proccessing");

            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userName: name,
                login: login,
                password: sha256(password),
              }),
            };

            fetch(
              "http://dev.trainee.dex-it.ru/api/Auth/SignUp",
              requestOptions
            )
              .then((response) => response.json())
              .then((jsonContent) => {
                if (
                  refLogin.current &&
                  refPassword.current &&
                  refName.current &&
                  refVerificationPassword.current
                ) {
                  refLogin.current.value = "";
                  refPassword.current.value = "";
                  refName.current.value = "";
                  refVerificationPassword.current.value = "";
                }
                setMessage("Successfully created account");
              })
              .catch((ex) => {
                setMessage("User already exist");
              });
          } else setMessage("Passwords don't match");
        } else setMessage("Please accept agreements");
      } else setMessage("Fields can not be empty");
    }
  };

  const accept = () => {
    /*
     
},
watch: {
  user_logged_in: {
    handler() {
      const token = localStorage.getItem("JWToken");
      if (token !== null) window.location.replace("/Workplace");
    },
    immediate: true,
  },
},

*/
    accept_agreement === false
      ? setAcceptAgreement(true)
      : setAcceptAgreement(false);
  };

  return (
    <div className={style.container_signup}>
      <div>
        <img src="/Images/SignUp_basketball.jpg" id={style.signup_image} />
      </div>
      <div className={style.signup_input}>
        <form>
          <p className={style.page_title}>Sign Up</p>

          <div className={style.inputBox}>
            <label>Name</label>
            <input type="text" required ref={refName} />
          </div>

          <div className={style.inputBox}>
            <label>Login</label>
            <input type="text" required ref={refLogin} />
          </div>

          <div className={style.inputBox}>
            <label>Password</label>
            <input type="password" required ref={refPassword} />
          </div>

          <div className={style.inputBox}>
            <label>Enter password again</label>
            <input type="password" required ref={refVerificationPassword} />
          </div>
          <input type="checkbox" onClick={accept} />
          <label style={{ marginLeft: "5px" }}>I accept the agreement</label>
          <button id={style.button_signup} onClick={create_account}>
            Sign Up
          </button>
        </form>
        <p>
          Already a member?
          <a href="/" style={{ marginLeft: "5px", color: "#d33864" }}>
            Sign In
          </a>
        </p>
        <p style={{ color: "red" }}>{message}</p>
      </div>
    </div>
  );
}
