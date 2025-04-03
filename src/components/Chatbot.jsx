import React, { useState, useEffect } from "react";
import styles from "../styles/chatbot.module.css";
import responses from "../assets/responses.json";

const Chatbot = ({ isVisible, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (isVisible) {
      setMessages([{ sender: "bot", text: "Hello, I'm Alfred, and I'm here to help! How can I assist you today?" }]);
    }
  }, [isVisible]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    let botResponse = "I'm sorry, I don't understand that.";
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes("log in")) {
      botResponse = responses.login;
    } else if (lowerInput.includes("register")) {
      botResponse = responses.register;
    } else if (lowerInput.includes("create profile")) {
      botResponse = responses.createProfile;
    } else if (lowerInput.includes("view profile")) {
      botResponse = responses.viewProfile;
    } else if (lowerInput.includes("edit profile")) {
      botResponse = responses.editProfile;
    } else if (lowerInput.includes("delete profile")) {
      botResponse = responses.deleteProfile;
    } else if (lowerInput.includes("search profiles")) {
      botResponse = responses.searchProfiles;
    } else if (lowerInput.includes("secret")) {
      botResponse  = ":,(";
    } else {
        botResponse = "I'm sorry, I don't understand that. I'm stupid! <3";
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    }, 500);

    setInput("");
  };

  if (!isVisible) return null;

  return (
    <div className={styles["chatbot-container"]}>
      <div className={styles["chatbot-header"]}>
        <h3>Chatbot</h3>
        <img src="./assets/snoo.png" className={styles["chatbot-icon"]} />
        <p>Alfred</p>
        <button onClick={onClose} className={styles["close-button"]}>
          ✖
        </button>
      </div>
      <div className={styles["chatbot-body"]}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.sender === "bot"
                ? styles["bot-message"]
                : styles["user-message"]
            }
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className={styles["chatbot-footer"]}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;