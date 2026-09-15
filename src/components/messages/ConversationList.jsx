import "../../App.css";

function ConversationList({ conversations, selectedConversation, onSelect }) {
    return (
        <div className="chat-sidebar">

            <div className="chat-sidebar-header">
                <h2>Messages</h2>
                <span>2 unread</span>
            </div>

            <div className="conversations-list">

                {conversations.map((conversation) => (
                    <div
                        key={conversation.id}
                        className={`conversation-item ${
                            selectedConversation?.id === conversation.id
                                ? "active"
                                : ""
                        }`}
                        onClick={() => onSelect(conversation)}
                    >
                        <div className="conversation-avatar">
                            {conversation.name?.charAt(0)}
                        </div>

                        <div className="conversation-info">
                            <div className="conv-top">
                                <span>{conversation.name}</span>
                                <span>{conversation.time}</span>
                            </div>

                            <p>{conversation.lastMessage}</p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default ConversationList;