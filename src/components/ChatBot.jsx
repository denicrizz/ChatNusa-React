import React, { useState, useEffect, useRef } from "react";
import { sendMessageToBot } from "../services/botApi";
import { FaMoon, FaSun, FaComments } from "react-icons/fa";

export default function ChatUI() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Halo! Ada yang bisa saya bantu?" },
  ]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [history, setHistory] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userInput = input;
    setMessages((prev) => [...prev, { sender: "user", text: userInput }]);
    setInput("");
    setMessages((prev) => [...prev, { sender: "bot", text: "Typing..." }]);

    try {
      const data = await sendMessageToBot(userInput);
      await new Promise((r) => setTimeout(r, 1000));

      const botReply =
        data?.type === "repository"
          ? data.results?.length
            ? data.results
                .map(
                  (r) =>
                    `- ${r.title}\nLink: ${r.link}\nSkor: ${r.score.toFixed(3)}`
                )
                .join("\n\n")
            : "Tidak ada hasil relevan."
          : data?.type === "info_UNP"
          ? data.jawaban || "Tidak ada jawaban tersedia."
          : "Jenis respons tidak dikenali.";

      setMessages((prev) => {
        const copy = [...prev];
        copy.pop();
        return [...copy, { sender: "bot", text: botReply }];
      });
    } catch (err) {
      const copy = [...messages];
      copy.pop();
      setMessages([...copy, { sender: "bot", text: "Terjadi kesalahan. Silakan coba lagi." }]);
    }
  };

  const handleReset = () => {
    setMessages([{ sender: "bot", text: "Halo! Ada yang bisa saya bantu?" }]);
  };

  const handleLoadHistory = () => {
    try {
      const saved = localStorage.getItem("chatHistory");
      if (saved) {
        setHistory(JSON.parse(saved));
        setShowModal(true);
      } else {
        alert("Tidak ada riwayat chat.");
      }
    } catch (err) {
      alert("Gagal memuat riwayat.");
    }
  };

  const downloadTxt = () => {
    const content = messages.map((m) => `${m.sender}: ${m.text}`).join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "chat.txt";
    link.click();
  };

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(messages, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "chat.json";
    link.click();
  };

  return (
  <div className={`w-full h-screen font-['Poppins'] ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} flex flex-col`}>
    {/* Navbar */}
    <nav className="w-full bg-blue-600 dark:bg-gray-800 text-white p-4 flex items-center gap-3 shadow-md">
      <FaComments className="text-xl" />
      <h1 className="text-xl font-semibold tracking-wide">ChatNusa</h1>
    </nav>

    {/* Modal Riwayat */}
    {showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 w-full max-w-lg h-[70vh] overflow-y-auto">
          <h2 className="text-lg font-bold mb-2 dark:text-white">Riwayat Chat</h2>
          <pre className="text-sm whitespace-pre-wrap dark:text-white">
            {history.map((msg, idx) => `${msg.sender}: ${msg.text}`).join("\n")}
          </pre>
          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => setShowModal(false)}
          >
            Tutup
          </button>
        </div>
      </div>
    )}

    {/* Main Chat Area */}
    <div className="flex-1 flex justify-center items-center p-1 sm:p-4">
      <div className="w-full max-w-4xl h-[95%] sm:h-[90%] bg-white dark:bg-gray-800 rounded-xl shadow-xl flex flex-col overflow-hidden">
        {/* Chat content */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4 min-h-0">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`whitespace-pre-line max-w-[85%] sm:max-w-[75%] px-3 sm:px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input box */}
        <div className="border-t p-2 sm:p-4 bg-gray-50 dark:bg-gray-700 flex gap-2 items-center">
          <input
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
            placeholder="Ketik pesan..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(e)}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            onClick={handleSend}
          >
            Kirim
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 p-2 border-t bg-gray-100 dark:bg-gray-800 text-xs sm:text-sm text-gray-700 dark:text-white">
          <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
            <button onClick={handleReset} className="hover:underline text-red-600 dark:text-red-400">
              🔄 Reset Chat
            </button>
            <button onClick={handleLoadHistory} className="hover:underline">
              📜 Lihat Riwayat
            </button>
          </div>
          <div className="flex gap-2 flex-wrap justify-center sm:justify-end">
            <button onClick={downloadTxt} className="hover:underline">⬇️ Unduh TXT</button>
   {  /* <button onClick={downloadJson} className="hover:underline">⬇️ Unduh JSON</button> */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="hover:underline flex items-center gap-1"
            >
              {darkMode ? <FaSun /> : <FaMoon />} {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Footer */}
    <footer className={`text-center py-3 text-sm ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700"}`}>
      Dibuat dengan ❤️ oleh <span className="font-semibold">Deni Kristanto</span>
    </footer>
  </div>
);
}
