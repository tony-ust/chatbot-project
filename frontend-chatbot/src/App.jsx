import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import InputBox from './components/InputBox';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false); // New line

  const sendMessage = async (text) => {
    const userMessage = { sender: 'user', text };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setIsTyping(true); // Show typing indicator

    try {
      const response = await fetch('http://127.0.0.1:8080/api/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      const botMessage = { sender: 'bot', text: data.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      const errorMessage = { sender: 'bot', text: 'Oops! Something went wrong.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setIsTyping(false); // Hide typing indicator
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chatbot</div>
      <ChatWindow messages={messages} isTyping={isTyping} />
      <InputBox onSend={sendMessage} />
    </div>
  );
}

export default App;
