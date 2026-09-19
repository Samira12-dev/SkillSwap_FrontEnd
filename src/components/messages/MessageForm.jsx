
import { useState } from "react";
import { Send } from "lucide-react";

function MessageForm({ onSend }){
    const [content,setContent]=useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();

        const message=content.trim();

        if(!message||message.length>2000)return;

        onSend(message);
        setContent("");
    };

    return(
        <form className="chat-footer" onSubmit={handleSubmit}>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={content}
                    maxLength={2000}
                    onChange={(e)=>setContent(e.target.value)}
                />

                <button
                    type="submit"
                    className="send-btn"
                    disabled={!content.trim()}
                >
                    <Send size={18}/>
                </button>
            </div>

            {/* <span className="message-counter">
                {content.length}/2000
            </span> */}
        </form>
    );
}

export default MessageForm;