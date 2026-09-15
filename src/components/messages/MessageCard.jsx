function MessageCard({ message, currentUserId }) {

    const isMine = message.senderId === currentUserId;

    return (
        <div className={`message-row ${isMine ? "sent" : "received"}`}>

            {!isMine && (
                <div className="chat-msg-avatar">
                    {message.senderName?.charAt(0)}
                </div>
            )}

            <div className="message-content">

                <div className={`message-bubble ${isMine ? "sent" : "received"}`}>
                    {message.content}
                </div>

                <span className="msg-time">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    })}
                </span>

            </div>

        </div>
    );
}

export default MessageCard;