
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import "../App.css";
import ConversationList from "../components/messages/ConversationList";
import MessageList from "../components/messages/MessageList";
import MessageForm from "../components/messages/MessageForm";
import { AuthContext } from "../context/AuthContext";
import { getMyConversations } from "../services/conversationService";
import {
    getMessagesByConversation,
    markMessageAsRead
} from "../services/messageService";

function Messages() {
    const { user, setUnreadMessages } = useContext(AuthContext);
    const { conversationId } = useParams();

    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const stompClient = useRef(null);

    useEffect(() => {
        if (!user?.id) return;

        const loadConversations = async () => {
            try {
                const data = await getMyConversations(user.id);
                const list = data.content || [];

                const formatted = list.map((conversation) => ({
                    ...conversation,
                    name:
                        conversation.senderId === user.id
                            ? conversation.receiverName
                            : conversation.senderName,
                    createdAt: conversation.createdAt
                        ? new Date(conversation.createdAt)
                        : null
                }));

                setConversations(formatted);

                if (conversationId) {
                    const selected = formatted.find(
                        (conversation) =>
                            String(conversation.id) === String(conversationId)
                    );

                    if (selected) {
                        setSelectedConversation(selected);
                    }
                }
            } catch (error) {
                console.error("CONVERSATIONS ERROR:", error);
            } finally {
                setLoading(false);
            }
        };

        loadConversations();
    }, [user, conversationId]);

    useEffect(() => {
        if (!selectedConversation || !user?.id) return;

        const loadMessages = async () => {
            try {
                const data = await getMessagesByConversation(
                    selectedConversation.id,
                    user.id
                );

                const list = data.content || [];

                const formatted = list.map((message) => ({
                    ...message,
                    createdAt: message.createdAt
                        ? new Date(message.createdAt)
                        : null
                }));

                setMessages(formatted);

                for (const message of formatted) {
                    if (!message.isRead && message.senderId !== user.id) {
                        await markMessageAsRead(message.id, user.id);
                    }
                }

                const unreadCount = formatted.filter(
                    (message) =>
                        !message.isRead &&
                        message.senderId !== user.id
                ).length;

                if (unreadCount > 0) {
                    setMessages((prev) =>
                        prev.map((message) => ({
                            ...message,
                            isRead: true
                        }))
                    );

                    setUnreadMessages((prev) =>
                        Math.max(0, prev - unreadCount)
                    );
                }
            } catch (error) {
                console.error("MESSAGES ERROR:", error);
            }
        };

        loadMessages();
    }, [selectedConversation, user]);

    useEffect(() => {
        if (!selectedConversation || !user?.id) return;

        const client = new Client({
            brokerURL: "ws://localhost:8080/ws",
            reconnectDelay: 5000
        });

        client.onConnect = () => {
            client.subscribe(
                `/topic/conversation/${selectedConversation.id}`,
                (message) => {
                    const newMessage = JSON.parse(message.body);

                    setMessages((prev) => {
                        const exists = prev.some(
                            (item) => item.id === newMessage.id
                        );

                        if (exists) {
                            return prev;
                        }

                        return [
                            ...prev,
                            {
                                ...newMessage,
                                createdAt: newMessage.createdAt
                                    ? new Date(newMessage.createdAt)
                                    : null,
                                isRead: newMessage.senderId === user.id
                            }
                        ];
                    });

                    if (newMessage.senderId !== user.id) {
                        markMessageAsRead(newMessage.id, user.id)
                            .then(() => {
                                setUnreadMessages((prev) =>
                                    Math.max(0, prev - 1)
                                );
                            })
                            .catch((error) => {
                                console.error(
                                    "MARK AS READ ERROR:",
                                    error
                                );
                            });
                    }
                }
            );
        };

        client.onStompError = (error) => {
            console.error("WebSocket error:", error);
        };

        client.onWebSocketError = (error) => {
            console.error("WebSocket connection error:", error);
        };

        client.activate();
        stompClient.current = client;

        return () => {
            client.deactivate();
            stompClient.current = null;
        };
    }, [selectedConversation, user]);

    const sendMessage = (content) => {
        const message = content.trim();

        if (!message) return;
        if (message.length > 2000) return;
        if (!selectedConversation) return;
        if (!stompClient.current?.connected) return;

        stompClient.current.publish({
            destination: `/app/chat/${selectedConversation.id}/${user.id}`,
            body: JSON.stringify({
                content: message
            })
        });
    };

    if (loading) {
        return <div className="messages-page">Loading...</div>;
    }

    return (
        <div className="messages-page">
            <div className="chat-container">
                <ConversationList
                    conversations={conversations}
                    selectedConversation={selectedConversation}
                    onSelect={setSelectedConversation}
                />

                <div className="chat-main">
                    {selectedConversation ? (
                        <>
                            <div className="chat-header">
                                <h3>
                                    {selectedConversation.senderId === user.id
                                        ? selectedConversation.receiverName
                                        : selectedConversation.senderName}
                                </h3>
                            </div>

                            <MessageList
                                messages={messages}
                                currentUserId={user.id}
                            />

                            <MessageForm onSend={sendMessage} />
                        </>
                    ) : (
                        <div className="chat-empty">
                            <p>
                                Select a conversation to start messaging.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Messages;

