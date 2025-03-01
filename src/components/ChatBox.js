"use client";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebaseConfig";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Fetch unique user ID from localStorage
  const chatUserId =
    typeof window !== "undefined"
      ? localStorage.getItem("chatUserId")
      : "Guest";

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    await addDoc(collection(db, "messages"), {
      text: input,
      userId: chatUserId, // Set sender to unique user ID
      timestamp: serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5">
      {/* Live Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white px-5 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-all"
      >
        💬 Live Chat
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-16 right-5 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-500 text-white p-3 flex justify-between">
            <span>Live Chat</span>
            <button onClick={() => setIsOpen(false)} className="text-white">
              ✖
            </button>
          </div>
          <div className="p-3 h-60 overflow-y-auto">
            {messages.map((msg) => (
              <p
                key={msg.id}
                className={`mb-1 text-sm ${
                  msg.sender === chatUserId ? "text-blue-500" : "text-gray-700"
                }`}
              >
                <strong>
                  {msg.sender === chatUserId ? "You" : msg.sender}:
                </strong>{" "}
                {msg.text}
              </p>
            ))}
          </div>
          <form onSubmit={sendMessage} className="p-3 border-t flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 border rounded dark:bg-gray-600 dark:text-white"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
