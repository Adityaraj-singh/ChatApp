import React, { useState,useRef, useEffect } from "react";
import Axios from "axios";
import "./signup.css";
import { useHistory } from "react-router";

import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";

const Login = ({ data, Setdata, login, Setlogin }) => {
  const dispatch = useDispatch();
  const hmm = useSelector((state) => state.islogged);
const [isContainerActive,setIsContainerActive]=useState(false)
  const history = useHistory();
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const [error, Seterror] = useState();
  const textAreaRef=useRef()

  useEffect(()=>{
    console.log('aditya',textAreaRef)
  },[textAreaRef])
  /*
   
        if(localStorage.getItem('user'))
        {
         
          Setdata(JSON.parse(localStorage.getItem('user')))
    
        }
        */


  function login() {
    dispatch({ type: "Signin", payload: { loading: true } });
    Axios.post("http://localhost:4000/authenticate/login", {
      email: email,
      pass: password,
    })
      .then((res) => {
        dispatch({ type: "Signin", payload: { loading: false } });
        localStorage.setItem("user", JSON.stringify(res.data.token));
        history.push("/home");
      })
      .catch((err) => {
        dispatch({ type: "Signin", payload: { loading: false } });
        console.log(err);
        Seterror("Invalid Credentials");
      });
  }

  function emaill(e) {
    Setemail(e.target.value);
  }

  function passwordd(e) {
    Setpassword(e.target.value);
  }

  return (
    <div className="login">
      <div className={isContainerActive  ? "container-active" : "container"}>
        <center>
          <h2 className="text-xl">
            <strong>Welcome back</strong>
          </h2>
        </center>
        <form className="form">
          <div className="field">
            <div className="inputs" id="email-input">
              <span>
                <strong>E-mail</strong>
              </span>
              <Input
                size="large"
                className="text-field"
                id="email"
                placeholder="large size"
                prefix={<UserOutlined />}
                onChange={emaill}
                // onFocus={()=>setIsContainerActive(true)}
                // onBlur={()=>setIsContainerActive(false)}

              />
            </div>
          </div>

          <div className="field">
            <div className="inputs" id="password-input">
              <span>
                <strong>Password</strong>
              </span>
              <Input.Password
                className="text-field"
                id="password"
                placeholder="input password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                ref={textAreaRef}
                onChange={passwordd}
                // onFocus={()=>setIsContainerActive(true)}
                // onBlur={()=>setIsContainerActive(false)}
              />
            </div>
          </div>
          <center>
            <div className="loginerror">{error}</div>
          </center>
          <center>
            <button
              type="button"
              className="submit bg-blue-700"
              onClick={login}
            >
              {" "}
              Login{" "}
              {hmm[0].loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : null}{" "}
            </button>
          </center>
        </form>
        <a
          className="switch-sign-in"
          id="switch-sign-in"
          href="#signup"
          onClick={() => Setlogin(false)}
        >
          <strong>
            <span className="text-blue-500">New here? </span> create account
          </strong>
        </a>
      </div>
    </div>
  );
};

export default Login;
