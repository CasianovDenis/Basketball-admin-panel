import React, { useState, useEffect, createRef } from "react";
import { sha256 } from "js-sha256";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

import style from "./SignUp.module.css";
import Signup_image from "./Signup_image.png";
export default function SignUp() {
  const navigate = useNavigate();

  const [wrong_name, setWrongName] = useState("");
  const [wrong_login, setWrongLogin] = useState("");
  const [wrong_password, setWrongPassword] = useState("");
  const [wrong_verifie_password, setWrongVerifiePassword] = useState("");
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
      if (name.length > 0) {
        setWrongName("");
        if (login.length > 0) {
          setWrongLogin("");
          if (password.length > 0) {
            setWrongPassword("");
            if (verification_password.length > 0) {
              setWrongVerifiePassword("");
              if (accept_agreement === true) {
                setMessage("");
                if (password === verification_password) {
                  Toastify({
                    text: "Proccessing",
                    className: "info",
                    style: {
                      background: "linear-gradient(to right, #fe8c00, #f83600)",
                    },
                  }).showToast();

                  setWrongPassword("");
                  setWrongVerifiePassword("");
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
                      Toastify({
                        text: "Successfully created account",
                        className: "info",
                        style: {
                          background:
                            "linear-gradient(to right, #1d976c, #93f9b9)",
                        },
                      }).showToast();
                    })
                    .catch((ex) => {
                      Toastify({
                        text: "User already exist",
                        className: "info",
                        style: {
                          background:
                            "linear-gradient(to right, #eb3349, #f45c43)",
                        },
                      }).showToast();
                    });
                } else {
                  setWrongPassword("Passwords don't match");
                  setWrongVerifiePassword("Passwords don't match");
                }
              } else setMessage("Please accept agreements");
            } else setWrongVerifiePassword("Field can not be empty");
          } else setWrongPassword("Field can not be empty");
        } else setWrongLogin("Field can not be empty");
      } else setWrongName("Field can not be empty");
    }
  };

  const accept = () => {
    accept_agreement === false
      ? setAcceptAgreement(true)
      : setAcceptAgreement(false);
  };

  return (
    <div className={style.container_signup}>
      <div className={style.image_container}>
        <img src={Signup_image} id={style.signup_image} />
      </div>
      <div className={style.signup_input}>
        <form>
          <p className={style.page_title}>Sign Up</p>

          <div className={style.inputBox}>
            <label>Name </label>
            <input type="text" required ref={refName} />
            <p style={{ color: "red" }}>{wrong_name}</p>
          </div>

          <div className={style.inputBox}>
            <label>Login </label>
            <input type="text" required ref={refLogin} />
            <p style={{ color: "red" }}>{wrong_login}</p>
          </div>

          <div className={style.inputBox}>
            <label>Password</label>
            <input type="password" required ref={refPassword} />
            <p style={{ color: "red" }}>{wrong_password}</p>
          </div>

          <div className={style.inputBox}>
            <label>Enter password again</label>
            <input type="password" required ref={refVerificationPassword} />
            <p style={{ color: "red" }}>{wrong_verifie_password}</p>
          </div>
          <div className={style.agreeement_box}>
            <input type="checkbox" onClick={accept} />
            <label style={{ marginLeft: "5px" }}>I accept the agreement</label>
          </div>
          <button id={style.button_signup} onClick={create_account}>
            Sign Up
          </button>
        </form>
        <p style={{ marginLeft: "15px", marginTop: "15px" }}>
          Already a member?
          <a href="/" style={{ marginLeft: "5px", color: "#E4163A" }}>
            Sign In
          </a>
        </p>
        <p style={{ color: "red" }}>{message}</p>
      </div>
    </div>
  );
}
