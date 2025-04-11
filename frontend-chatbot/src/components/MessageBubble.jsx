// src/components/MessageBubble.jsx

import React from 'react';

function MessageBubble({ sender, text }) {
  return (
    <div className={`message ${sender}`}>
      {text}
    </div>
  );
}

export default MessageBubble;
