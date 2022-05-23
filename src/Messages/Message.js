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
  const [chatuser, Setchatuser] = useState([]);
  const conversation = useSelector((state) => state.setcurrentchatuser2);
  useEffect(async () => {
    if (conversation) {
      //           console.log(conversation)

      try {
        const res = await Axios.get(
          "http://localhost:5000/getuser/showinfo?userId=" + conversation
        );

        Setchatuser(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  }, [conversation]);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="message-top">
        <div className="messageImg" style={{ marginRight: "4px" }}>
          <Avatar sx={{ width: 32, height: 32 }}>
            {own
              ? hmm[0].name[0]
              : chatuser.name && chatuser.name.length > 0
              ? JSON.stringify(chatuser.name)[1]
              : "M"}
          </Avatar>
        </div>
        <p className="message-text">{message}</p>
      </div>
      <div className="message-bottom">{format(time)}</div>
    </div>
  );
};

export default Message;
