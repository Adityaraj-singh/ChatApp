import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router";
import { useRef } from "react";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Avatar, Image, Card, Badge, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import store from "../forms/reducers/store";
import { useSelector, useDispatch, use } from "react-redux";
import { TiArrowBack } from "react-icons/ti";
import "./conversation.css";
import { AiOutlineSend } from "react-icons/ai";
import Message from "./Message";
import { ImAttachment } from "react-icons/im";
import axios from "axios";
import { io } from "socket.io-client";

const Conversation = ({ chat, arrivalmessage }) => {
  const dispatch = useDispatch();
  const hmm = useSelector((state) => state.islogged);
  const currentchatid = useSelector((state) => state.setcurrentchat);
  const currentchattingfriend = useSelector(
    (state) => state.setcurrentchatuser2
  );
  const [messages, Setmessages] = useState([]);
  const [newMessage, SetnewMessage] = useState("");
  const scrollRef = useRef();
  const socket = useRef();
  const [otheruser, Setotheruser] = useState("");
  const currentchatReducer = useSelector((state) => state.setcurrentchat);
  const temp2 = useSelector((state) => state.setcurrentchatuser2);

  const [currentchat, setCurrentChat] = useState();
  function removechat() {
    dispatch({ type: "removechat" });
    localStorage.removeItem("CurrentconversationId");
  }

  useEffect(() => {
    if (currentchattingfriend == arrivalmessage.sender) {
      Setmessages([...messages, arrivalmessage]);
    }
  }, [arrivalmessage, currentchattingfriend]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      console.log("Incoming Message", data);
    });
  }, []);
  async function getConversations(chat) {
    try {
      const res = await Axios.get(
        "http://localhost:5000/conversation/" + hmm[0].id
      );

      if (res.data.length > 0) {
        let temp = res.data.find((user) => {
          return user._id === currentchatReducer;
        });

        setCurrentChat(temp);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getConversations();
  });
  //Send Message Api integration
  async function handleSubmit(e) {
    e.preventDefault();
    let message = {
      sender: hmm[0].id,
      text: newMessage,
      conversationId: currentchatid,
    };
    try {
      let reciever = currentchat.members.find((member) => member !== hmm[0].id);
      /* console.log(reciever);
      console.log(currentchat); */
      socket.current = io("ws://localhost:8900");
      socket.current.emit("sendMessage", {
        senderId: hmm[0].id,
        recieverId: temp2,
        text: newMessage,
      });
      const res = await axios.post(
        "http://localhost:5000/message/send",
        message
      );
      Setmessages([...messages, res.data]);
      SetnewMessage("");
    } catch (err) {
      console.log(err);
    }
  }

  //get all chats as soon as window loads
  useEffect(async () => {
    const getConversation = async () => {
      try {
        //here chat is  conversation id
        const res = await axios.get(
          "http://localhost:5000/message/show/" + chat
        );
        const res2 = await Axios.get(
          "http://localhost:5000/getuser/showinfo?userId=" +
            currentchattingfriend
        );
        // console.log(res)
        Setmessages(res.data);
        Setotheruser(res2.data.name);
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  }, [chat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="conversation-container">
      <div className="top-bar-conversation">
        <div className="back-button">
          <button className="bg-gree-500 rounded-full" onClick={removechat}>
            <TiArrowBack
              className="back-icon"
              id="back-icon"
              onClick={removechat}
            />
          </button>
        </div>

        <div className="top-user-detail">
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            style={{ border: "1px solid black" }}
            size={40}
          ></Avatar>
          <b>{" " + otheruser}</b>
        </div>

        <div className="online">
          <p>{"last seen 1 min ago"}</p>
        </div>
      </div>
      <div className="conversations">
        {messages.map((item, index) => {
          return (
            <div key={index} ref={scrollRef}>
              <Message
                own={item.sender == hmm[0].id}
                message={item.text}
                time={item.createdAt}
              />
            </div>
          );
        })}
      </div>
      <center>
        <div className="chatbox">
          <textarea
            className="chat-input"
            placeholder="write something"
            onChange={(e) => SetnewMessage(e.target.value)}
            value={newMessage}
          ></textarea>
          <button
            className="chat-submit"
            onClick={newMessage.length > 0 ? handleSubmit : null}
          >
            <AiOutlineSend className="send-icon" size={20} />
          </button>
          <button className="chat-submit  ">
            <ImAttachment className="send-icon" size={20} />
          </button>
        </div>
      </center>
    </div>
  );
};

export default Conversation;
