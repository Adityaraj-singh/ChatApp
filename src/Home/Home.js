import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Home.css";
import { useHistory } from "react-router";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useRef } from "react";
import { io } from "socket.io-client";

import { Avatar, Card, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import store from "../forms/reducers/store";
import { useSelector, useDispatch, use } from "react-redux";
import { Link } from "react-router-dom";
import Conversation from "../Messages/Conversation";
import { AutoComplete } from "antd";
import Chatlist from "../Messages/Chatlist";
import { List, message, Skeleton, Divider } from "antd";
const Home = ({ data, Setdata }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const hmm = useSelector((state) => state);
  const currentchatReducer = useSelector((state) => state.setcurrentchat);
  const [search, setSearch] = useState("");
  const [currentchatscreenid, Setcurrentchatscreenid] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const socket = useRef();
  // console.log(currentchatReducer)
  const [arrivalmessage, setArrivalmessage] = useState(false);
  function signout() {
    localStorage.removeItem("user");
    localStorage.removeItem("CurrentconversationId");
    dispatch({ type: "Signout" });
    Setdata(null);
    history.push("/");
    dispatch({ type: "removechat" });
  }

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    if (hmm.islogged[0].id && hmm.islogged[0].id !== "defaultID")
      socket.current.emit("addUser", hmm.islogged[0].id);
    socket.current.on("getUsers", (users) => {
      console.log("userss", users);
    });
  }, [hmm]);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      console.log("Incoming Message", data);
      setArrivalmessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  });
  useEffect(async () => {
    if (search.length > 0) {
      const res = await Axios.get(
        "http://localhost:5000/getuser/search?username=" + search
      );
      console.log("res");
      console.log(res.data);
      console.log(res.data.length);
      setSearchResults(res.data);
    }
  }, [search]);

  useEffect(() => {
    console.log("changingg", arrivalmessage);
  }, [arrivalmessage]);

  useEffect(async () => {
    await Axios.get("http://localhost:5000/authenticate", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("user")}`,
      },
    })
      .then((res) => {
        dispatch({
          type: "Signin",
          payload: {
            id: res.data._id,
            name: res.data.name,
            email: res.data.email,
            password: res.data.password,
            loading: false,
          },
        });
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function adduser(user) {
    console.log(hmm.islogged[0].id, ":", user._id);
    await Axios.post("http://localhost:5000/Conversation/ ", {
      senderId: hmm.islogged[0].id,
      recieverId: user._id,
    })
      .then(() => {
        console.log("successs");
      })
      .catch((err) => {
        console.log("----->>>", err);
      });
  }
  return (
    <div className="home">
      <div className="top-bar">
        <div className="root-username" id="root-username">
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            style={{ border: "1px solid black" }}
            size={40}
          ></Avatar>
        </div>
        <input
          type="search"
          className="search-bar"
          id="search-bar"
          placeholder="loooking for..."
          onChange={(e) => setSearch(e.target.value)}
        />

        {search.length > 0 ? (
          <div className="search-result-box">
            <List
              dataSource={searchResults}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={
                          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        }
                      />
                    }
                    title={
                      <button href="" className="user-link" id={item._id}>
                        <b>{item.name}</b>
                      </button>
                    }
                    description={item.email}
                  />
                  <button onClick={() => adduser(item)}>Add</button>
                </List.Item>
              )}
            />
          </div>
        ) : null}

        <button className="signout bg-white" id="signout" onClick={signout}>
          <b>Signoutss</b>
        </button>
      </div>
      <div className="mobile-search" id="mobile-search">
        <input
          type="search"
          className="search-bar-mobile"
          id="search-bar-mobile"
          placeholder="loooking for..."
        />
      </div>

      <div className="chat-box">
        <div className="chat-list">
          <Chatlist className="chatlist-component" />
        </div>

        <div className="conversation-component">
          {currentchatReducer ? (
            <Conversation
              chat={currentchatReducer}
              arrivalmessage={arrivalmessage}
            />
          ) : (
            "No chat selected"
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
