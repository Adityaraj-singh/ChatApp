import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./signup.css";
import auth from "./Firebase";
import { Input, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Redirect, useHistory } from "react-router";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import TextField from "@mui/material/TextField";
const Signup = ({ data, Setdata, login, Setlogin }) => {
  const [emailerr, Setemailerr] = useState(null);
  const [nameerr, Setnameerr] = useState("");
  const [passerr, Setpasserr] = useState("");
  const [email, Setemail] = useState("");
  const [name, Setname] = useState("");
  const [pass, Setpass] = useState("");
  const [type, Settype] = useState("password");
  const [opt, Setopt] = useState(0);
  const [go, Setgo] = useState(false);
  const history = useHistory();
  function enterdata() {
    if (localStorage.getItem("user")) {
      Setdata(JSON.parse(localStorage.getItem("user")));
    }

    Axios.post("http://localhost:5000/authenticate/register", {
      email: email,
      name: name,
      password: pass,
    })
      .then((res) => {
        console.log(res);

        Setdata({
          name: name,
          email: email,
          password: pass,
        });

        localStorage.setItem(
          "user",
          JSON.stringify({ name: name, email: email })
        );
        history.push("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (emailerr == "") {
      document.getElementById("email-input").style.width = "100%";
    }

    if (nameerr == "") {
      document.getElementById("name-input").style.width = "100%";
    }
    if (passerr == "") {
      document.getElementById("password-input").style.width = "100%";
    }
  }, [emailerr, nameerr, passerr]);

  function emailcheck(e) {
    Setemail(e.target.value);
    var re = /\S+@\S+\.\S+/;
    if (re.test(e.target.value) == false) {
      Setemailerr("Not Valid");
    } else {
      Setemailerr("Valid");
    }
  }

  function namecheck(e) {
    var name = e.target.value;
    Setname(name);
    if (name.length < 3) {
      Setnameerr("Too Small");
    } else {
      Setnameerr("Good");
    }
  }

  function passwordcheck(e) {
    let value = e.target.value;
    Setpass(value);
    if (value.length < 8) {
      Setpasserr("Too Weak");
    } else {
      Setpasserr("Good");
    }
  }

  function register() {
    if (nameerr == "Good" && emailerr == "Valid" && passerr == "Good") {
      let usermail = email;
      auth
        .createUserWithEmailAndPassword(usermail, pass)
        .then((usercredentials) => {
          usercredentials.user.sendEmailVerification();
          auth.signOut();

          console.log(usercredentials);
          Setemailerr("Good");
          enterdata();
        })
        .catch((err) => {
          Setemailerr("Email already taken");
        });
    }
  }

  function toggle() {
    if (type == "password") {
      Settype("text");
    } else {
      Settype("password");
    }
  }
  return (
    <div className="signup">
      <div className="container">
        <center>
          <h2 className="text-xl">
            <strong>Create Account</strong>
          </h2>
        </center>
        <div className="form">
          <div className="field">
            <div className="inputs" id="email-input">
              <lable>
                <strong> E-mail </strong>
              </lable>
              <Input
                size="large"
                className="text-field"
                id="email"
                placeholder="E-mail"
                onChange={emailcheck}
              />
            </div>

            <p
              className={
                emailerr === "Not Valid" || emailerr == "Email already taken"
                  ? "error email-error text-red-500"
                  : "error email-error text-green-500"
              }
              id="email-error"
            >
              {emailerr}
            </p>
          </div>
          <div className="field">
            <div className="inputs" id="name-input">
              <lable>
                <strong>Username </strong>
              </lable>

              <Input
                placeholder="Basic usage"
                className="text-field"
                onChange={namecheck}
                id="name"
              />
            </div>
            <div className="error">
              <span
                className={
                  nameerr === "Too Small"
                    ? "error name-error text-red-500"
                    : "error name-error text-green-500"
                }
                id="name-error"
              >
                {nameerr}
              </span>
            </div>
          </div>
          <div className="field">
            <div className="inputs" id="password-input">
              <lable>
                {" "}
                <strong>Password</strong>
              </lable>
              <Input.Password
                placeholder="input password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                className="text-field"
                id="password"
                onChange={passwordcheck}
              />
            </div>
            <div className="error">
              <span
                className={
                  passerr === "Too Weak"
                    ? "error name-error text-red-500"
                    : "error name-error text-green-500"
                }
                id="password-error"
              >
                {passerr}
              </span>
            </div>
          </div>

          <center>
            <button
              type="submit"
              className="submit bg-blue-700"
              onClick={register}
            >
              {" "}
              Get Started{" "}
            </button>
          </center>
        </div>
        <a
          className="text-red-500 switch-sign-in"
          id="switch-sign-in"
          href="#login"
          onClick={() => Setlogin(true)}
        >
          <strong>
            <span className="text-blue-500">Already a User </span> Login
          </strong>
        </a>
      </div>
    </div>
  );
};

export default Signup;
