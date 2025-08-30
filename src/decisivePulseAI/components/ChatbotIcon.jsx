import React from "react";

function ChatbotIcon({ toggleChat }) {
  return (
    <button
      onClick={toggleChat}
      className="fixed bottom-8 z-10 right-8 w-12 h-12 bg-[#008085] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#307174] focus:outline-none"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.77 0 3.45-.48 4.9-1.35l4.85.98-1.03-4.83A9.937 9.937 0 0 0 22 12c0-5.52-4.48-10-10-10zM7 9h10v2H7V9zm6 4H7v2h6v-2z"/>
      </svg>
    </button>
  );
}

export default ChatbotIcon;
