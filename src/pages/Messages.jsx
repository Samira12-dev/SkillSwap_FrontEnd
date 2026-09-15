import { useState } from "react";
import "../App.css";
import ConversationList from "../components/messages/ConversationList";
import MessageList from "../components/messages/MessageList";
import MessageForm from "../components/messages/MessageForm";

function Messages() {

    const userId = 1;

    const [conversations, setConversations] = useState([
        {
            id: 1,
            name: "Ahmed",
            lastMessage: "Are you ready for the session?",
            time: "10:30 AM"
        },
        {
            id: 2,
            name: "Sara",
            lastMessage: "Thank you!",
            time: "09:15 AM"
        }
    ]);

    const [selectedConversation, setSelectedConversation] =
        useState(conversations[0]);

    const [messages, setMessages] = useState([
        {
            id: 1,
            content: "Hello, are you ready for our session?",
            senderId: 2,
            senderName: "Ahmed",
            createdAt: new Date()
        },
        {
            id: 2,
            content: "Yes, I'm ready!",
            senderId: 1,
            senderName: "Samira",
            createdAt: new Date()
        }
    ]);

    const sendMessage = (content) => {

        const newMessage = {
            id: messages.length + 1,
            content: content,
            senderId: userId,
            senderName: "Samira",
            createdAt: new Date()
        };

        setMessages([...messages, newMessage]);
    };

    return (
        <div className="messages-page">

            <div className="chat-container">

                <ConversationList
                    conversations={conversations}
                    selectedConversation={selectedConversation}
                    onSelect={setSelectedConversation}
                />

                <div className="chat-main">

                    <div className="chat-header">
                        <div>
                            <h3>
                                {selectedConversation?.name}
                            </h3>

                            <span>Online</span>
                        </div>
                    </div>

                    <MessageList
                        messages={messages}
                        currentUserId={userId}
                    />

                    <MessageForm
                        onSend={sendMessage}
                    />

                </div>

            </div>

        </div>
    );
}

export default Messages;