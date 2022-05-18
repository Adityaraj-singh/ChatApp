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
import { useSelector, useDispatch, use } from "react-redux";
import "./chatlist.css";

const Usercard = ({ conversation, currentuser, people }) => {
  const [chatuser, Setchatuser] = useState([]);
  const [currentChat, SetcurrentChat] = useState();
  const [messages, Setmessages] = useState();
  const Setcurrentchat = useSelector((state) => state.setcurrentchat);
  const setcurrentchatuser = useSelector((state) => state.setcurrentchatuser);
  const dispatch = useDispatch();
  //    console.log(useSelector(state=>state))
  useEffect(async () => {
    if (conversation) {
      //           console.log(conversation)
      const friend = conversation.members.find((m) => m !== currentuser);

      try {
        const res = await Axios.get(
          "http://localhost:5000/getuser/showinfo?userId=" + friend
        );
        // console.log(res)
        Setchatuser(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  }, [conversation]);

  function chatsetter(e) {
    localStorage.setItem(
      "CurrentconversationId",
      JSON.stringify(conversation._id)
    );
    dispatch({
      type: "Setchat",
      payload: { conversationid: conversation._id },
    });
    dispatch({
      type: "Setchatuser",
      payload: {
        currentchatuser: conversation.members.find(
          (member) => member !== currentuser
        ),
      },
    });
  }

  return (
    <div className="chaiui">
      <Link
        to={"/home"}
        value="heyyaa"
        className="message-link"
        onClick={chatsetter}
      >
        <div className="user-card">
          <div className="inner-card">
            <Avatar
              className="user-icon"
              src={
                <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
            />

            <div className="left-inner">
              <h6 className="username">{chatuser.name}</h6>
              <div className="last-message">Heyyy</div>
            </div>
            <div className="right-inner">
              <p>
                <Badge className="message-count" size="small" count={2}></Badge>
              </p>
            </div>
          </div>
          <hr className="divider" />
        </div>
      </Link>
    </div>
  );
};

export default Usercard;
