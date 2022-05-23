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
import { Image, Card, Badge } from "antd";
import Avatar from "@mui/material/Avatar";
import { UserOutlined } from "@ant-design/icons";
import store from "../forms/reducers/store";
import DeleteIcon from "@mui/icons-material/Delete";
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

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    if (name.split(" ").length > 1) {
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
      };
    } else {
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: `${name[0]}`,
      };
    }
  }
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
            <Avatar {...stringAvatar(chatuser.name)} />

            <div className="left-inner">
              <h6 className="username">{chatuser.name}</h6>
              <div className="last-message">Heyyy</div>
            </div>
            <div className="right-inner">
              <p>
                <DeleteIcon />
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
