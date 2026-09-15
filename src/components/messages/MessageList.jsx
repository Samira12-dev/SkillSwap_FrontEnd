import MessageCard from "./MessageCard";

function MessageList({ messages, currentUserId }) {
    return (
        <div className="chat-messages">

            {messages.map((message) => (
                <MessageCard
                    key={message.id}
                    message={message}
                    currentUserId={currentUserId}
                />
            ))}

        </div>
    );
}

export default MessageList;