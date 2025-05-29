import React, { useState, useEffect, useRef } from "react";
import { sendMessageToBot } from "../services/botApi";
import { FaMoon, FaSun, FaComments, FaPaperPlane, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const convertLinksToAnchors = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline break-all"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

export default function ChatUI() {
  // Initialize darkMode from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : true;
  });

  // Initialize messages from localStorage or default message
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [
      { sender: "bot", text: "Halo! Ada yang bisa saya bantu?" }
    ];
  });
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [history, setHistory] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Save darkMode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
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

      let botReply = "";
      
      if (data?.type === "repository" && data.results?.length) {
        // Format hasil pencarian repositori dengan lebih rapi
        botReply = `Berikut hasil pencarian:\n\n${data.results
          .map((r, i) => 
            `${i + 1}. ${r.title}\n   Link: ${r.link}\n   Skor: ${r.score.toFixed(3)}`
          )
          .join("\n\n")}`;
      } else if (data?.type === "info_UNP") {
        // Langsung tampilkan jawaban untuk informasi kampus
        botReply = data.jawaban || "Maaf, tidak ada informasi yang tersedia.";
      } else if (data?.type === "error") {
        // Tangani pesan error
        botReply = "Maaf, terjadi kesalahan. Silakan coba lagi.";
      } else {
        // Pesan default jika tipe tidak dikenali
        botReply = "Maaf, saya tidak dapat memproses permintaan Anda. Silakan coba pertanyaan lain.";
      }

      setMessages((prev) => {
        const copy = [...prev];
        copy.pop(); // Hapus pesan "Typing..."
        return [...copy, { sender: "bot", text: botReply }];
      });
    } catch (err) {
      console.error(err);
      setMessages((prev) => {
        const copy = [...prev];
        copy.pop(); // Hapus pesan "Typing..."
        return [...copy, { sender: "bot", text: "Terjadi kesalahan sistem. Silakan coba lagi." }];
      });
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

  // Toggle dark mode handler
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
  <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
    {/* Navbar - Fixed at top */}
    <nav className="w-full bg-blue-600 dark:bg-gray-800 text-white p-4 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-3">
        <Link to="/" className="hover:text-gray-200 transition">
          <FaComments className="text-xl" />
        </Link>
        <Link to="/" className="hover:text-gray-200 transition">
          <h1 className="text-xl font-semibold tracking-wide">ChatNusa</h1>
        </Link>
      </div>
      <button
        onClick={toggleDarkMode}
        className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 transform hover:scale-110"
        aria-label={darkMode ? "Light Mode" : "Dark Mode"}
      >
        {darkMode ? (
          <FaSun className="w-5 h-5 text-yellow-300" />
        ) : (
          <FaMoon className="w-5 h-5 text-gray-100" />
        )}
      </button>
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

    {/* Main chat container - Fills remaining height */}
    <div className="flex-1 overflow-hidden p-4">
      <div className="h-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl flex flex-col">
        {/* Messages container - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-end gap-2 mb-4 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && (
                <img
                  src={logo}
                  alt="Bot Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <div
                className={`whitespace-pre-line max-w-[75%] sm:max-w-[65%] px-3 sm:px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white rounded-bl-none"
                }`}
              >
                {convertLinksToAnchors(msg.text)}
              </div>
              {msg.sender === "user" && (
                <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300">
                  <FaUser className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input and buttons - Fixed at bottom */}
        <div className="border-t bg-gray-50 dark:bg-gray-700">
          {/* Input box */}
          <div className="p-4 flex gap-2">
            <input
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white text-gray-900 placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Ketik pesan..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(e)}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-all duration-300 hover:scale-105"
              onClick={handleSend}
            >
              <FaPaperPlane className="w-5 h-5" />
            </button>
          </div>

          {/* Action buttons */}
          <div className="px-4 py-2 border-t bg-gray-100 dark:bg-gray-800 flex flex-wrap justify-between items-center gap-2">
            <div className="flex gap-2">
              <button 
                onClick={handleReset}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 text-gray-900 dark:text-white"
              >
                <span className="text-red-500">🔄</span>
                <span>Reset Chat</span>
              </button>
              <button 
                onClick={handleLoadHistory}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 text-gray-900 dark:text-white"
              >
                <span className="text-blue-500">📜</span>
                <span>Lihat Riwayat</span>
              </button>
            </div>
            <button 
              onClick={downloadTxt}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 text-gray-900 dark:text-white"
            >
              <span className="text-green-500">⬇️</span>
              <span>Unduh TXT</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Footer */}
    <footer className="text-center py-3 text-sm bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
      Dibuat dengan <span className="text-red-500 animate-pulse">❤️</span> oleh{" "}
      <span className="font-semibold">Deni Kristanto</span>
    </footer>
  </div>
);
}
