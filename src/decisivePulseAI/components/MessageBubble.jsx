import React from "react";
import { formatTextToHTML} from "./chatbot/staticFunc";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

dayjs.extend(isToday);
dayjs.extend(isYesterday);

function getDateLabel(dateStr) {
  const date = dayjs(dateStr);
  if (date.isToday()) return "Today";
  if (date.isYesterday()) return "Yesterday";
  return date.format("MMM DD, YYYY");
}

function groupMessagesByDate(messages) {
  return messages.reduce((acc, message) => {
    const label = getDateLabel(message.time);
    if (!acc[label]) acc[label] = [];
    acc[label].push(message);
    return acc;
  }, {});
}

function ChatMessages({ message }) {
  const isUser = message.sender === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      {typeof message.text === "string" ?(
        <>
        {isUser && 
            <div
              className={`px-4 py-2 rounded-lg text-sm ${
                isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
              }`}
            >
              {message.text}
            </div>
        }
        {!isUser && 
          <div
            className={`w-full px-4 py-2 rounded-lg text-sm ${
              isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
            }`}
            dangerouslySetInnerHTML={{ __html: formatTextToHTML(message.text) }}
          />
          
        }
        </>

      ):typeof message.text === "object"?(
        <table className="min-w-full table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Key</th>
            <th className="border border-gray-400 px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(message.text).map(([key, value], index) => (
            <tr key={index}>
              <td className="border border-gray-400 px-4 py-2">{key}</td>
              <td className="border border-gray-400 px-4 py-2">
                {typeof value === "object" ? (
                  <pre className="text-sm">{JSON.stringify(value, null, 2)}</pre>
                ) : (
                  value.toString()
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      ):(
        <></>
      )
      
      }
    </div>
  );
}

export default function MessageBubble({ messages }) {
  const grouped = groupMessagesByDate(messages);

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([label, groupMsgs]) => (
        <div key={label}>
          <div className="text-center text-xs font-semibold text-gray-500 mb-2">
            {label}
          </div>
          {groupMsgs.map((message, idx) => (
            <div key={idx} className="space-y-1">
              <ChatMessages message={message} />
              <div
                className={`text-xs text-gray-400 ${
                  message.sender === "user" ? "text-right" : "text-left"
                }`}
                title={dayjs(message.time).format("DD MMM YYYY, hh:mm A")}
              >
                {dayjs(message.time).format("hh:mm A")}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
