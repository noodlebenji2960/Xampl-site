import React, { useState, useEffect, useRef } from 'react';
import { FaComments } from 'react-icons/fa'; // Importing an icon for the button
import './ChatNow.css'; // Importing the CSS for styling

const ChatNow = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatWindowRef = useRef(null);

  // Toggle Chat Window
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Handle sending a message
  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      // Simulate a response from the chat support
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Thank you for reaching out! How can I help you?', sender: 'support' }
        ]);
      }, 1000);
    }
  };

  // Close chat window if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatWindowRef.current && !chatWindowRef.current.contains(event.target)) {
        setIsChatOpen(false);
      }
    };

    if (isChatOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isChatOpen]);

  return (
    <div className="chatNow">
      {/* Chat Button */}
      <button className="chat-button" onClick={toggleChat}>
        <FaComments size={24} />
      </button>

      {/* Chat Window */}
      <div
        ref={chatWindowRef}
        className={`chat-window ${isChatOpen ? 'open' : 'closed'}`}
      >
        <div className="chat-header">
          <span>Chat with Us</span>
          <button className="close-button" onClick={toggleChat}>
            &times;
          </button>
        </div>
        <div className="chat-body">
          <div className="messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <p>{message.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatNow;
