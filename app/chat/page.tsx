"use client";

import { useEffect, useState } from "react";
type BusinessInfo = {

  name: string;

  hours: string;

  services: string;

  address: string;

  phone: string;

  bookingUrl: string;

};
type Message = {
  sender: "ai" | "user";
  text: string;
};

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [business, setBusiness] = useState<BusinessInfo | null>(null);

useEffect(() => {

  const savedBusiness = localStorage.getItem("savvyBusiness");

  if (savedBusiness) {

    setBusiness(JSON.parse(savedBusiness));

  }

}, []);

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hi! I'm Savvy, the AI employee for Bella Beauty Studio. How can I help you today?",
    },
  ]);

  async function sendMessage() {
    const cleanMessage = message.trim();

    if (!cleanMessage || isLoading) return;

    setMessages((current) => [
      ...current,
      { sender: "user", text: cleanMessage },
    ]);

    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {

  method: "POST",

  headers: {

    "Content-Type": "application/json",

  },

  body: JSON.stringify({

    message: cleanMessage,

    business,

  }),

});

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.reply || "Request failed");
      }

      setMessages((current) => [
        ...current,
        { sender: "ai", text: data.reply },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          sender: "ai",
          text: "Sorry, I could not answer right now. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function startNewChat() {
    setMessages([
      {
        sender: "ai",
        text: "New conversation started. How can I help?",
      },
    ]);
  }

  return (
    <main
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        background: "#f8fafc",
      }}
    >
      <aside
        style={{
          width: "250px",
          background: "#111827",
          color: "white",
          padding: "25px",
        }}
      >
        <h1>🧠 Savvy</h1>
        <p style={{ color: "#94a3b8" }}>Your AI Employee</p>

        <button
          onClick={startNewChat}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "10px",
            background: "#2563eb",
            color: "white",
            cursor: "pointer",
          }}
        >
          New Chat
        </button>
      </aside>

      <section
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <header
          style={{
            background: "white",
            borderBottom: "1px solid #e2e8f0",
            padding: "18px 24px",
          }}
        >
          <strong>Bella Beauty Studio</strong>
          <div style={{ color: "#64748b", fontSize: "13px", marginTop: 4 }}>
            Chat with our AI employee
          </div>
        </header>

        <div
          style={{
            flex: 1,
            padding: "24px",
            overflowY: "auto",
          }}
        >
          {messages.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  item.sender === "user" ? "flex-end" : "flex-start",
                marginBottom: "14px",
              }}
            >
              <div
                style={{
                  maxWidth: "72%",
                  padding: "12px 16px",
                  borderRadius:
                    item.sender === "user"
                      ? "16px 16px 4px 16px"
                      : "16px 16px 16px 4px",
                  background:
                    item.sender === "user" ? "#2563eb" : "#e5e7eb",
                  color: item.sender === "user" ? "white" : "#111827",
                }}
              >
                {item.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div
              style={{
                display: "inline-block",
                background: "#e5e7eb",
                padding: "12px 16px",
                borderRadius: "16px",
              }}
            >
              Savvy is typing...
            </div>
          )}
        </div>

        <div
          style={{
            padding: "18px",
            borderTop: "1px solid #d1d5db",
            background: "white",
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") sendMessage();
            }}
            placeholder="Ask Savvy something..."
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
              fontSize: "16px",
            }}
          />

          <button
            onClick={sendMessage}
            disabled={isLoading}
            style={{
              padding: "14px 24px",
              border: "none",
              borderRadius: "10px",
              background: "#2563eb",
              color: "white",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.6 : 1,
            }}
          >
            Send
          </button>
        </div>
      </section>
    </main>
  );
}