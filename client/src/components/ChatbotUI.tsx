import { useState } from "react";
import { Bot, X } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const ChatbotUI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hello 👋 How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    
    // Add user message to UI immediately
    const newMessages = [...messages, { sender: "user" as const, text: userMessage }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Call YOUR backend API endpoint, not the n8n webhook directly
      const response = await fetch("http://localhost:5000/api/chatbot", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTPS ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Add bot response
      setMessages((prev) => [
        ...prev, 
        { sender: "bot" as const, text: data.reply || "🤖 No reply received." }
      ]);
      
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot" as const, text: "⚠️ Error connecting to server. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-black
        flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300"
      >
        {/* Glow effect */}
        <span className="absolute inset-0 rounded-full bg-blue-500 opacity-30 blur-xl animate-pulse"></span>
        <Bot className="w-8 h-8 text-white relative z-10" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-500 to-black text-white">
            <h3 className="font-semibold">Chatbot</h3>
            <button onClick={toggleChat}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white self-end ml-auto"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-gray-200 text-gray-800 p-2 rounded-lg max-w-[80%]">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2 bg-gray-50">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
              placeholder={isLoading ? "Sending..." : "Type your message..."}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-blue-500 text-white px-3 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatbotUI;