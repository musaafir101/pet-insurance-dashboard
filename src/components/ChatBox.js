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

  // Generate or fetch unique user ID
  useEffect(() => {
    if (typeof window !== "undefined") {
      let userId = localStorage.getItem("chatUserId");
      if (!userId) {
        userId = `User-${Math.floor(Math.random() * 10000)}`;
        localStorage.setItem("chatUserId", userId);
      }
    }
  }, []);

  const chatUserId =
    typeof window !== "undefined"
      ? localStorage.getItem("chatUserId")
      : "Guest";

  // Fetch messages from Firestore
  const fetchMessages = () => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    return onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  };

  // Use fetchMessages in useEffect
  useEffect(() => {
    const unsubscribe = fetchMessages();
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Send message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      await addDoc(collection(db, "messages"), {
        text: input,
        userId: chatUserId,
        timestamp: serverTimestamp(),
      });

      setInput("");
    } catch (error) {
      console.error("Firestore error:", error);
      alert("Error sending message: " + error.message);
    }
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
                  msg.userId === chatUserId ? "text-blue-500" : "text-gray-700"
                }`}
              >
                <strong>
                  {msg.userId === chatUserId ? "You" : msg.userId}:
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
