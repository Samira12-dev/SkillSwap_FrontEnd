
import { Inbox } from "lucide-react";
import SwapRequestCard from "./SwapRequestCard";
import "../../App.css";

function SwapRequestList({
    requests,
    type,
    onAccept,
    onReject,
    onCancel
}) {
    if (!requests || requests.length === 0) {
        return (
            <div className="swap-empty">
                <div className="swap-empty-icon">
                    <Inbox size={22} />
                </div>

                <h3>No swap requests found</h3>

                <p>There are no requests in this section.</p>
            </div>
        );
    }

    return (
        <div className="swap-request-list">
            {requests.map((request) => (
                <SwapRequestCard
                    key={request.id}
                    request={request}
                    type={type}
                    onAccept={onAccept}
                    onReject={onReject}
                    onCancel={onCancel}
                />
            ))}
        </div>
    );
}

export default SwapRequestList;

