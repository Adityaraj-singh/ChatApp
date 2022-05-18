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
import Usercard from "./Usercard";
import "./chatlist.css";

const Chatlist = () => {
  const [conversation, Setconversation] = useState([]);
  const hmm = useSelector((state) => state.islogged);

  useEffect(async () => {
    const getConversations = async () => {
      try {
        const res = await Axios.get(
          "http://localhost:5000/conversation/" + hmm[0].id
        );
        //console.log(res)
        Setconversation(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
    console.log("chatlists", conversation);
  }, [hmm]);

  //   console.log('convossss')
  //   console.log(conversation)
  return (
    <div className="chatlist-container">
      {conversation.length > 0
        ? conversation.map((user) => {
            return (
              <Usercard
                currentuser={hmm[0].id}
                key={user._id}
                conversation={user}
                currentId={hmm[0].id}
              />
            );
          })
        : "No conversations yet"}
    </div>
  );
};

export default Chatlist;
