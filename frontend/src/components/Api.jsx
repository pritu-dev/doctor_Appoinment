
import React, { useState } from "react";
import axios from "axios";
import { AppContext } from '../context/AppContextProvider';
import { useContext } from "react";

const Api = () => {
  const { backendUrl } = useContext(AppContext);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const chatWithAi = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    try {
      setLoading(true);
      setReply("");

      const { data } = await axios.post("https://backenddoctor-tha4.onrender.com/api/ai/chat", { message });
      console.log(`backendUrl` + "/api/ai/chat");

      console.log(data);

      // Backend response ke according property adjust karein
      setReply(data.reply || data.message || JSON.stringify(data));
    } catch (err) {
      console.error("AI Error:", err.response?.data || err.message);
      setReply(
        err.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div
        className="card shadow mx-auto p-4"
        style={{ maxWidth: "650px", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-4" style={{ color: "#5F6FFF" }}>
          Chat with AI 🤖
        </h3>

        <form onSubmit={chatWithAi}>
          <label className="form-label fw-semibold">
            Ask your question
          </label>

          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Example: What is React.js?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn text-white w-100"
            style={{ backgroundColor: "#5F6FFF" }}
            disabled={loading}
          >
            {loading ? "Thinking..." : "Send Message"}
          </button>
        </form>

        {reply && (
          <div className="mt-4 p-3 bg-light rounded">
            <h5>AI Response</h5>
            <p className="mb-0" style={{ whiteSpace: "pre-wrap" }}>
              {reply}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Api;
