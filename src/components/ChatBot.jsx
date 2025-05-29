import React, { useState, useEffect, useRef } from "react";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: "Halo! Ada yang bisa saya bantu?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { text: userText, sender: "user" }]);
    setInput("");

    try {
      const res = await fetch("https://bot-api.zpedia.eu.org/api/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userText }),
      });

      if (!res.ok) throw new Error("Gagal menghubungi server");

      const data = await res.json();
      let reply = "";

      if (data.type === "repository") {
        reply = data.results?.length
          ? data.results
              .map(
                (r) => `- ${r.title}\nLink: ${r.link}\nSkor: ${r.score}`
              )
              .join("\n\n")
          : "Tidak ada hasil relevan.";
      } else if (data.type === "info_UNP") {
        reply = data.jawaban || "Tidak ada jawaban tersedia.";
      } else {
        reply = "Jenis respons tidak dikenali.";
      }

      setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: `Terjadi kesalahan: ${error.message}`, sender: "bot" },
      ]);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full max-w-2xl h-[600px] bg-white rounded-xl shadow-xl flex flex-col">
      {/* Chat content */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`whitespace-pre-line max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-900 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input box */}
      <div className="border-t p-4 bg-gray-50 flex gap-2">
        <input
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ketik pesan..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          onClick={handleSend}
        >
          Kirim
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
