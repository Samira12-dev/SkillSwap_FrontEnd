import { useState } from "react";
import { Send } from "lucide-react";

function MessageForm({ onSend }) {

    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!content.trim()) {
            return;
        }

        onSend(content);

        setContent("");
    };

    return (
        <form className="chat-footer" onSubmit={handleSubmit}>

            <div className="input-container">

                <input
                    type="text"
                    placeholder="Type a message..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button type="submit" className="send-btn">
                    <Send size={18} />
                </button>

            </div>

        </form>
    );
}

export default MessageForm;