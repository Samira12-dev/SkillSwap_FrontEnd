
import {
    ArrowRight,
    Check,
    Clock3,
    MessageSquare,
    X
} from "lucide-react";
import { Link } from "react-router-dom";
import "../../App.css";

function SwapRequestCard({
    request,
    type,
    onAccept,
    onReject,
    onCancel
}) {
    const userName =
        type === "received"
            ? request.senderName
            : request.receiverName;

    const status = request.swapStatus?.toLowerCase();

    const createdAt = request.createdAt
        ? new Date(request.createdAt).toLocaleDateString()
        : "-";

    return (
        <div className="swap-request-item">

            <div className="swap-request-user">
                <div className="swap-request-avatar">
                    {userName?.charAt(0)?.toUpperCase()}
                </div>

                <div>
                    <h3>{userName}</h3>
                </div>
            </div>

            <div className="swap-request-main">

                <div className="swap-exchange">

                    <div className="swap-skill">
                        <span>OFFERS</span>
                        <strong>
                            {request.skillOfferedName}
                        </strong>
                    </div>

                    <div className="swap-arrow">
                        <ArrowRight size={17} />
                    </div>

                    <div className="swap-skill">
                        <span>WANTS</span>
                        <strong>
                            {request.skillWantedName}
                        </strong>
                    </div>

                </div>

                <div className="swap-message">
                    <p>{request.message}</p>
                </div>

            </div>

            <div className="swap-request-side">

                <div className={`swap-status ${status}`}>

                    {status === "pending" && (
                        <Clock3 size={14} />
                    )}

                    {status === "accepted" && (
                        <Check size={14} />
                    )}

                    {status === "rejected" && (
                        <X size={14} />
                    )}

                    {status === "completed" && (
                        <Check size={14} />
                    )}

                    {request.swapStatus}
                </div>

                <span className="swap-date">
                    {createdAt}
                </span>

            </div>

            <div className="swap-request-actions">

                {type === "received" &&
                    request.swapStatus === "PENDING" && (
                        <>
                            <button
                                className="swap-action accept"
                                onClick={() =>
                                    onAccept(request.id)
                                }
                            >
                                <Check size={15} />
                                Accept
                            </button>

                            <button
                                className="swap-action reject"
                                onClick={() =>
                                    onReject(request.id)
                                }
                            >
                                <X size={15} />
                                Reject
                            </button>
                        </>
                    )}

                {type === "sent" &&
                    request.swapStatus === "PENDING" && (
                        <button
                            className="swap-action cancel"
                            onClick={() =>
                                onCancel(request.id)
                            }
                        >
                            <X size={15} />
                            Cancel
                        </button>
                    )}

                {request.swapStatus === "ACCEPTED" &&
                    request.conversationId && (
                        <Link
                            to={`/messages/${request.conversationId}`}
                            className="swap-action message"
                        >
                            <MessageSquare size={15} />
                            Message
                        </Link>
                    )}

                {request.swapStatus === "COMPLETED" && (
                    <span className="swap-completed">
                        <Check size={15} />
                        Completed
                    </span>
                )}

            </div>

        </div>
    );
}

export default SwapRequestCard;

