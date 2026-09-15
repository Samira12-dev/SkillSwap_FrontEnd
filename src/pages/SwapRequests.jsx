import { useState } from "react";
import { ArrowDownUp, Inbox, Send } from "lucide-react";
import "../App.css";
import SwapRequestList from "../components/swapRequests/SwapRequestList";

function SwapRequests() {
    const [activeTab, setActiveTab] = useState("all");

    const receivedRequests = [
        {
            id: 1,
            senderName: "Yassine Amrani",
            senderCity: "Beni Mellal",
            skillOfferedName: "Java",
            skillWantedName: "English",
            message: "I can help you improve your Java skills if you can help me with English.",
            swapStatus: "PENDING",
            createdAt: "Today"
        },
        {
            id: 2,
            senderName: "Salma El Idrissi",
            senderCity: "Casablanca",
            skillOfferedName: "React",
            skillWantedName: "French",
            message: "I would like to practice French while sharing my React knowledge.",
            swapStatus: "ACCEPTED",
            createdAt: "Yesterday",
            conversationId: 4
        }
    ];

    const sentRequests = [
        {
            id: 3,
            receiverName: "Omar Benali",
            receiverCity: "Rabat",
            skillOfferedName: "Java",
            skillWantedName: "English",
            message: "I would like to exchange Java and English skills with you.",
            swapStatus: "PENDING",
            createdAt: "2 days ago"
        },
        {
            id: 4,
            receiverName: "Sara Alaoui",
            receiverCity: "Marrakech",
            skillOfferedName: "JavaScript",
            skillWantedName: "React",
            message: "I can help with JavaScript and I would like to learn React.",
            swapStatus: "COMPLETED",
            createdAt: "5 days ago"
        }
    ];

    const allRequests = [...receivedRequests, ...sentRequests];

    let displayedRequests = allRequests;

    if (activeTab === "received") {
        displayedRequests = receivedRequests;
    }

    if (activeTab === "sent") {
        displayedRequests = sentRequests;
    }

    const handleAccept = (id) => {
        console.log("Accept:", id);
    };

    const handleReject = (id) => {
        console.log("Reject:", id);
    };

    const handleCancel = (id) => {
        console.log("Cancel:", id);
    };

    return (
        <div className="swap-page">
            <div className="swap-page-header">
                <div>
                    <span className="swap-page-label">SKILLSWAP</span>
                    <h1>Swap Requests</h1>
                    <p>Manage your skill exchange requests and connections.</p>
                </div>

                <div className="swap-header-icon">
                    <ArrowDownUp size={24} />
                </div>
            </div>

            <div className="swap-stats">
                <div className="swap-stat-card">
                    <div className="swap-stat-icon all">
                        <ArrowDownUp size={18} />
                    </div>
                    <div>
                        <span>Total Requests</span>
                        <strong>{allRequests.length}</strong>
                    </div>
                </div>

                <div className="swap-stat-card">
                    <div className="swap-stat-icon received">
                        <Inbox size={18} />
                    </div>
                    <div>
                        <span>Received</span>
                        <strong>{receivedRequests.length}</strong>
                    </div>
                </div>

                <div className="swap-stat-card">
                    <div className="swap-stat-icon sent">
                        <Send size={18} />
                    </div>
                    <div>
                        <span>Sent</span>
                        <strong>{sentRequests.length}</strong>
                    </div>
                </div>
            </div>

            <div className="swap-content">
                <div className="swap-tabs">
                    <button
                        className={activeTab === "all" ? "swap-tab active" : "swap-tab"}
                        onClick={() => setActiveTab("all")}
                    >
                        All
                        <span>{allRequests.length}</span>
                    </button>

                    <button
                        className={activeTab === "received" ? "swap-tab active" : "swap-tab"}
                        onClick={() => setActiveTab("received")}
                    >
                        Received
                        <span>{receivedRequests.length}</span>
                    </button>

                    <button
                        className={activeTab === "sent" ? "swap-tab active" : "swap-tab"}
                        onClick={() => setActiveTab("sent")}
                    >
                        Sent
                        <span>{sentRequests.length}</span>
                    </button>
                </div>

                <div className="swap-list-header">
                    <div>
                        <h2>
                            {activeTab === "all" && "All Requests"}
                            {activeTab === "received" && "Received Requests"}
                            {activeTab === "sent" && "Sent Requests"}
                        </h2>
                        <p>
                            {activeTab === "all" && "All your skill exchange activity"}
                            {activeTab === "received" && "People who want to exchange skills with you"}
                            {activeTab === "sent" && "Requests you have sent to others"}
                        </p>
                    </div>
                </div>

                <SwapRequestList
                    requests={displayedRequests}
                    type={activeTab}
                    onAccept={handleAccept}
                    onReject={handleReject}
                    onCancel={handleCancel}
                />
            </div>
        </div>
    );
}

export default SwapRequests;

