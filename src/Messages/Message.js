import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Avatar, Image, Card, Badge } from "antd";
import store from "../forms/reducers/store";
import { useSelector,} from "react-redux";
import "./message.css";
import { format,} from "timeago.js";
const Message = ({ own, message, time }) => {
  const hmm = useSelector((state) => state.islogged);
  const [chatuser, Setchatuser] = useState([]);
  const conversation = useSelector((state) => state.setcurrentchatuser2);
  useEffect(async () => {
    if (conversation) {
      try {
        const res = await Axios.get(
          "http://localhost:4000/getuser/showinfo?userId=" + conversation
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
