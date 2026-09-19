import { useContext, useEffect, useState } from "react";
import { ArrowDownUp, Inbox, Send } from "lucide-react";
import "../App.css";
import SwapRequestList from "../components/swapRequests/SwapRequestList";
import { AuthContext } from "../context/AuthContext";
import { getReceivedRequests, getSentRequests, acceptSwapRequest, rejectSwapRequest, cancelSwapRequest } from "../services/swapRequestService";

function SwapRequests() {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState("all");
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.id) return;

        const loadRequests = async () => {
            try {
                const received = await getReceivedRequests(user.id);
                setReceivedRequests(received.content || []);

                const sent = await getSentRequests(user.id);
                setSentRequests(sent.content || []);
            } catch (error) {
                console.error("Error loading requests:", error);
            }
            setLoading(false);
        };

        loadRequests();
    }, [user]);

    const allRequests = [...receivedRequests, ...sentRequests];

    let displayedRequests = allRequests;

    if (activeTab === "received") {
        displayedRequests = receivedRequests;
    }

    if (activeTab === "sent") {
        displayedRequests = sentRequests;
    }

    const handleAccept = async (id) => {
    try {
        const updatedRequest = await acceptSwapRequest(id, user.id);

        setReceivedRequests((prev) =>
            prev.map((request) =>
                request.id === id ? updatedRequest : request
            )
        );
    } catch (error) {
        console.error("ACCEPT ERROR:", error);
    }
};
    const handleReject = async (id) => {
        try {
            const request = await rejectSwapRequest(id, user.id);
            setReceivedRequests(receivedRequests.map(item => item.id === id ? request : item));
        } catch (error) {
            console.error("Reject error:", error);
        }
    };

    const handleCancel = async (id) => {
        try {
            await cancelSwapRequest(id, user.id);

            setSentRequests((prev) =>
                prev.filter((request) => request.id !== id)
            );
        } catch (error) {
            console.error( error);
        }
    };


    if (loading) {
        return (
            <div className="swap-page">
                <div className="swap-page-header">
                    <div>
                        <span className="swap-page-label">SKILLSWAP</span>
                        <h1>Swap Requests</h1>
                        <p>Manage your skill exchange requests and connections.</p>
                    </div>
                </div>
                <div className="swap-content">
                    <p>Loading requests...</p>
                </div>
            </div>
        );
    }

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
                    <button className={activeTab === "all" ? "swap-tab active" : "swap-tab"} onClick={() => setActiveTab("all")}>
                        All
                        <span>{allRequests.length}</span>
                    </button>

                    <button className={activeTab === "received" ? "swap-tab active" : "swap-tab"} onClick={() => setActiveTab("received")}>
                        Received
                        <span>{receivedRequests.length}</span>
                    </button>

                    <button className={activeTab === "sent" ? "swap-tab active" : "swap-tab"} onClick={() => setActiveTab("sent")}>
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