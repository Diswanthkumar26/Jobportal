import { useEffect, useRef, useState } from "react";
import api from "../../services/api";

export default function EmployerMessagesPage() {
  const employerId = Number(localStorage.getItem("userId")) || 1;
  const candidateId = 2; // TODO: replace with selected candidate

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const endRef = useRef(null);

  const scrollToBottom = () => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/messages/chat/${employerId}/${candidateId}`);
      setMessages(res.data || []);
    } catch (err) {
      console.error("Failed to fetch messages", err);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    const text = newMessage.trim();
    if (!text || sending) return;

    try {
      setSending(true);
      await api.post("/messages/send", {
        senderRole: "EMPLOYER",
        senderId: employerId,
        receiverId: candidateId,
        content: text,
      });

      setNewMessage("");
      await fetchMessages(); // refresh thread
    } catch (err) {
      console.error("Failed to send message", err);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <h1 className="mb-4 text-lg font-semibold text-slate-900">Messages</h1>

      {/* Chat box */}
      <div className="flex h-[400px] flex-col gap-3 overflow-y-auto rounded-xl border bg-slate-50 p-4">
        {loading && (
          <p className="text-center text-sm text-slate-400">
            Loading messages…
          </p>
        )}

        {!loading && messages.length === 0 && (
          <p className="text-center text-sm text-slate-400">
            No messages yet
          </p>
        )}

        {!loading &&
          messages.map((msg, index) => {
            const isEmployer = msg.senderRole === "EMPLOYER";
            return (
              <div
                key={index}
                className={`max-w-[70%] rounded-lg px-4 py-2 text-sm shadow-sm ${
                  isEmployer
                    ? "self-end bg-indigo-600 text-white"
                    : "self-start bg-slate-200 text-slate-800"
                }`}
              >
                <p>{msg.content}</p>

                {/* Optional: label + time if you have msg.sentAt */}
                <div className="mt-1 text-[10px] text-slate-200/80">
                  {isEmployer ? "You" : "Candidate"}
                  {/* {msg.sentAt && " • " + new Date(msg.sentAt).toLocaleTimeString()} */}
                </div>
              </div>
            );
          })}

        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="mt-4 flex gap-3">
        <textarea
          rows={1}
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 resize-none rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={sendMessage}
          disabled={sending || !newMessage.trim()}
          className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
