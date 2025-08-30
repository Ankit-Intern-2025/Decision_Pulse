import React, { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import msgLoading from '../resources/home/msgLoading.gif'
import { BiCollapse } from "react-icons/bi";
import { BiExpand } from "react-icons/bi";
import { fetchChatBot } from "../../http/dashboard_api";
import { io } from "socket.io-client";
import config from "../../utils/config";
import { CircularProgress } from "@mui/material";
import { IoInformationCircle } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
// const socket = io("http://4.186.63.133", {
//   transports: ["websocket", "polling"], // Enable WebSocket
// });
function ChatWindow({ closeChat }) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false); // Track minimize state
  const [loading, setLoading] = useState(false)
  const [loadingChatbot, setLoadingChatbot] = useState(true)
  const divRef = useRef(null); // Create a ref to access the div
  const [isMaximized, setIsMaximized] = useState(false)
  const [fileId, setFileId] = useState(null);
  const socketRef = useRef(null); // avoid re-renders on socket change
  const messageBoxRef = useRef(null);
  const [isDisabledChatbot, setIsDisabledChatbot] = useState(false)
  const [error, setError] = useState(false)
  const location = useLocation()
  useEffect(() => {
    const { version_id = "", module_id = "" } = JSON.parse(sessionStorage.getItem("selectedDashboard")) || {};
    if (!version_id || !module_id){
      setLoadingChatbot(false)
      setLoading(false)
      setIsDisabledChatbot(true)
      return
    };
    const ws = new WebSocket(`${config.CHAT_URL}/${module_id}/${version_id}`);
    
    ws.onerror = ()=>{
      setLoadingChatbot(false)
      setLoading(false)
      setIsDisabledChatbot(true)
    }
    ws.onopen = () => {
      setLoadingChatbot(true)
      setIsDisabledChatbot(false)
      console.log("Connected to WebSocket server");
    };
  
    ws.onmessage = (event) => {
      const data = event.data;
  
      // Handle file_id message
      try {
        const jsonData = JSON.parse(data);
        if (jsonData.file_id!==null) {
          setFileId(jsonData.file_id);
          // sessionStorage.setItem("chatbotId", jsonData.file_id); // optional if you still want to use sessionStorage
          setLoading(false); // Hide loader now
          setLoadingChatbot(false)
          messageBoxRef.current?.focus();
          return;
        }else{
          setLoadingChatbot(false)
          setLoading(false)
          setIsDisabledChatbot(true)
          setError(true)
        }
      } catch {
        // not a JSON message, proceed
      }
  
      if (
        data.includes("Assistant started: Text(annotations=[], value=") ||
        data.includes("Tool Call Initiated")||
        data.includes("file_id")
      ) {
        // Skip intermediate messages
      } else {
        setMessages((prevMessages) => {
          const tempPrevMsgs = [...prevMessages];
          const lastIndex = tempPrevMsgs.length - 1;
          if (tempPrevMsgs?.[lastIndex]?.sender === "user") {
            return [...prevMessages, { text: data, sender: "bot", time:new Date() }];
          } else {
            tempPrevMsgs[lastIndex].text += data;
            return tempPrevMsgs;
          }
        });
      }
  
      setTimeout(() => handleScrollDown(), 0);
      setLoading(false)
    };
  
    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };
  
    socketRef.current = ws;
  
    return () => {
      ws.close();
    };
  }, [location.pathname]);
  
  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("botconv"))
    if(storedMessages?.length>0){
      setMessages(storedMessages)
      setTimeout(() => handleScrollDown(), 0);
    }else{
      setTimeout(()=>{
        setMessages([{text:"Hi there! 👋 I'm here to help you with information from dashboard. What would you like to know?", time:new Date(), sender:"bot"}])
      },1000)
    }
  }, []);
  useEffect(()=>{
    if(!isDisabledChatbot){
      localStorage.setItem("botconv", JSON.stringify(messages))
    }
  },[messages])
  const sendMessage = () => {
    if (socketRef.current && input.trim() !== "" && fileId) {
      setLoading(true);
      setMessages([...messages, { text: input, sender: "user", time:new Date() }]);
      socketRef.current.send(JSON.stringify({ message: input, file_id: fileId }));
      setInput("");
      setTimeout(() => handleScrollDown(), 0);
    }
  };
  const handleScrollDown = () => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight; // Scroll to the bottom
    }
  };
  

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized); // Toggle minimize state
    toggleMenu()
  };
  const toggleMaximize = ()=>{
    setIsMaximized(prev=>{
      if(isMinimized){
        setIsMinimized(!isMinimized)
      }
      return !prev
    })
    toggleMenu()
  }
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const toggleMenu = ()=>{
    setIsOpenMenu(prev=>!prev)
  }
  const dropdownRef = useRef(null);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpenMenu(false);
    }
  };
  const handleClearChat = () => {
   setMessages([])
   toggleMenu()
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      className={`fixed bottom-16 right-8 flex flex-col ${
        isMinimized ? "w-24 h-16" :isMaximized?"w-[60%] h-[80%]" :"w-[380px] h-auto"
      } p-2 bg-white rounded-lg shadow-lg z-50`}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Chatbot Icon"
            className="w-8 h-8"
          />
         
          <div className={`pl-2 ${isMinimized ? "hidden" : "block"}`}>
            <p className="text-sm text-[#6f6f75]">PulseIQ</p>
            <p className="text-sm text-[#7c7c86]">AI Chatbot</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 relative">
          <BsThreeDots onClick={toggleMenu} className="cursor-pointer text-gray-500 hover:text-gray-700 h-6 w-6 rounded-3xl p-1" />
          {isOpenMenu && 
            <div ref={dropdownRef} className="absolute w-[150px]  rounded-md text-[#6f6f75] bg-gray-50 p-1 top-7 right-5 z-50 text-sm flex flex-col gap-1 border border-gray-300">
              <span className="cursor-pointer hover:bg-gray-100 rounded-md p-1 " onClick={toggleMaximize}>
                {isMaximized? 
                  <span className="flex gap-1 items-center">
                    <BiCollapse className="h-4 w-4 text-black" />
                    <span>Collapse</span>
                  </span>
                  :<span className="flex gap-1 items-center">
                    <BiExpand className="h-4 w-4 text-black" /> 
                    <span>Expand</span>
                    </span> 
                }
              </span>
              <button
                onClick={toggleMinimize} // Minimize button
                className="text-gray-500 hover:text-gray-700 cursor-pointer text-start hover:bg-gray-100 rounded-md p-1 focus:outline-none"
              >
                {isMinimized ? "⬆️ Maximize" : "⬇️ Minimize"}
              </button>
              <span className="cursor-pointer hover:bg-gray-100 rounded-md p-1 " onClick={handleClearChat}>
                  <span className="flex gap-1 items-center">
                    <MdDelete className="h-4 w-4 text-black" />
                    <span>Clear Chat</span>
                  </span>
              </span>

            </div>
          }
          <button
            onClick={closeChat}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            ✕
          </button>
           
        </div>
      </div>
      {!isMinimized && (
        <>
          <div ref={divRef} className={`${isMaximized?"h-[100%]":"h-80"} overflow-y-auto space-y-2 p-4 relative custom-scrollbar`}>
            <MessageBubble messages={messages} />
            {loading && 
              <div className="relative bottom-2 left-0 " style={{scrollBehavior:"smooth"}}>
                <img src={msgLoading} className="h-16 w-16 object-contain" />
              </div>
            }
          </div>
          <div className="flex flex-col items-center gap-1">
            {isDisabledChatbot?
            <div className="text-sm flex flex-col items-center justify-center text-[#6f6f75]">
              <span>Chatbot disconnected!</span>
              <div className="  flex items-center justify-center gap-2">
                <IoInformationCircle /> 
                <span>{error? "Something went wrong, Please try again":"Please Select/Open a dashboard."}</span>
              </div>
            </div>
            :loadingChatbot? 
            <span className="text-sm text-[#6f6f75]">Connecting PulseIQ AI Chatbot, please wait</span>
            :null
            }
            
            <div className="flex items-center px-3 border rounded-lg p-1 w-full">
              <input
              ref={messageBoxRef}
                type="text"
                placeholder={loadingChatbot?"Preparing Chatbot":"Type a message"}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 focus:outline-none"
                disabled={loadingChatbot||isDisabledChatbot}
              />
              {loadingChatbot && 
                <CircularProgress size={20} />
              }
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-white text-white rounded-r-lg hover:bg-gray-200 focus:outline-none"
                disabled={loadingChatbot||loading||isDisabledChatbot}
              >
                <i className="fas fa-paper-plane text-[#0077ff]"></i>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatWindow;


