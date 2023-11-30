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

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Box from "@mui/material/Box";
import Logout from "@mui/icons-material/Logout";
const Home = ({ data, Setdata }) => {
  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });
  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimenion]);

  const history = useHistory();
  const dispatch = useDispatch();
  const hmm = useSelector((state) => state);
  const currentchatReducer = useSelector((state) => state.setcurrentchat);
  const [search, setSearch] = useState("");
  const [currentchatscreenid, Setcurrentchatscreenid] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [onlineusers, setOnlineusers] = useState([]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    //  console.log(windowDimenion);

    // document.getElementById("home").style.height = windowDimenion.winHeight;
    if (windowDimenion.winWidth < 864) {
      if (currentchatReducer) {
        //    console.log("----Showw chat", currentchatReducer);
        document.getElementById("chatList").style.display = "none";
        document.getElementById("conversationComponent").style.display =
          "inline";
        document.getElementById("conversationComponent").style.width = "100%";
      } else {
        document.getElementById("chatList").style.width = "100%";
        document.getElementById("chatList").style.display = "inline";
        document.getElementById("conversationComponent").style.display = "none";
      }
    } else {
      document.getElementById("chatList").style.display = "block";
      document.getElementById("conversationComponent").style.display = "inline";
      document.getElementById("conversationComponent").style.width = "70%";

      document.getElementById("chatList").style.width = "30%";
    }
  }, [windowDimenion, currentchatReducer]);
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
      // console.log("userss", users);
      setOnlineusers([...onlineusers, users]);
    });
  }, [hmm]);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      //  console.log("Incoming Message", data);
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
      //  console.log(res.data.length);

      setSearchResults(
        res.data.filter((item) => item._id !== hmm.islogged[0].id)
      );
    }
  }, [search]);

  useEffect(() => {
    //  console.log("changingg", arrivalmessage);
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
    //  console.log(hmm.islogged[0].id, ":", user._id);
    await Axios.post("http://localhost:2000/Conversation/ ", {
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
    <div className="home" id="home">
      <div className="top-bar">
        <div className="search-box">
          {" "}
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
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {item.name[0]}
                        </Avatar>
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
        </div>

        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                {hmm?.islogged[0]?.name && hmm?.islogged[0]?.name.length > 0
                  ? hmm.islogged[0]?.name[0]
                  : "M"}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <p style={{ textAlign: "center" }}>{hmm.islogged[0].name}</p>
          <MenuItem onClick={() => signout()}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
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
        <div className="chat-list" id="chatList">
          <Chatlist className="chatlist-component" />
        </div>

        <div className="conversation-component" id="conversationComponent">
          {currentchatReducer ? (
            <Conversation
              windowDimenion={windowDimenion}
              chat={currentchatReducer}
              arrivalmessage={arrivalmessage}
            />
          ) : (
            "null"
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
