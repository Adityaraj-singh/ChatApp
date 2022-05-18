import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Avatar, Image, Card, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import store from "../forms/reducers/store";
import { useRef } from "react";
import { useSelector, useDispatch, use } from "react-redux";
import { TiArrowBack } from "react-icons/ti";
import "./message.css";
import { format, render, cancel, register } from "timeago.js";
import { io } from "socket.io-client";
const Message = ({ own, message, time }) => {
  const hmm = useSelector((state) => state.islogged);

  /*  useEffect(() => {
    socket.current.emit("addUser", hmm[0].id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [hmm]); */

  return (
    <div className={own ? "message own" : "message"}>
      <div className="message-top">
        <div className="messageImg">
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            style={{ border: "1px solid black", marginRight: "2px" }}
            size={30}
          ></Avatar>
        </div>
        <p className="message-text">{message}</p>
      </div>
      <div className="message-bottom">{format(time)}</div>
    </div>
  );
};

export default Message;
