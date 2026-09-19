import "../../App.css";

function ConversationList({
    conversations,
    selectedConversation,
    onSelect,
    unreadCount
}) {
    return (
        <div className="chat-sidebar">
            <div className="chat-sidebar-header">
                <h2>Messages</h2>
                <span>{unreadCount} unread</span>
            </div>

            <div className="conversations-list">
                {conversations.length === 0 ? (
                    <div className="empty-conversations">
                        <p>No conversations yet.</p>
                    </div>
                ) : (
                    conversations.map((conversation) => (
                        <div
                            key={conversation.id}
                            className={
                                selectedConversation?.id === conversation.id
                                    ? "conversation-item active"
                                    : "conversation-item"
                            }
                            onClick={() => onSelect(conversation)}
                        >
                            <div className="conversation-avatar">
                                {conversation.name?.charAt(0)?.toUpperCase()}
                            </div>

                            <div className="conversation-info">
                                <div className="conv-top">
                                    <span>{conversation.name}</span>

                                    <span>
                                        {conversation.createdAt
                                            ? new Date(
                                                  conversation.createdAt
                                              ).toLocaleDateString()
                                            : ""}
                                    </span>
                                </div>

                                <p>
                                    {conversation.lastMessage ||
                                        "Start a conversation"}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ConversationList;