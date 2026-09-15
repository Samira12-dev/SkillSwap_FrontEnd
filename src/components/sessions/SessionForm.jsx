
import { CalendarDays, X } from "lucide-react";
import { useState } from "react";
import "../../App.css";

function SessionForm({ onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        duration: "",
        mode: "ONLINE",
        conversationId: "",
        meetingUrl: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            date: `${formData.date}T${formData.time}`,
            duration: Number(formData.duration),
            mode: formData.mode,
            conversationId: Number(formData.conversationId),
            meetingUrl:
                formData.mode === "ONLINE"
                    ? formData.meetingUrl
                    : null
        };

        onSubmit(data);
    };

    return (
        <div className="session-form-wrapper">
            <form className="session-form" onSubmit={handleSubmit}>
                <div className="session-form-header">
                    <div className="session-form-icon">
                        <CalendarDays size={20} />
                    </div>

                    <div>
                        <h2>Schedule Session</h2>
                        <p>
                            Choose the date, time and session mode.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="session-form-close"
                        onClick={onCancel}
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="session-form-grid">
                    <div className="session-form-group">
                        <label>Date</label>

                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="session-form-group">
                        <label>Time</label>

                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="session-form-group">
                        <label>Duration</label>

                        <select
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select duration</option>
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="60">60 minutes</option>
                            <option value="90">90 minutes</option>
                        </select>
                    </div>

                    <div className="session-form-group">
                        <label>Mode</label>

                        <select
                            name="mode"
                            value={formData.mode}
                            onChange={handleChange}
                        >
                            <option value="ONLINE">Online</option>
                            <option value="PRESENTIEL">Presentiel</option>
                        </select>
                    </div>

                    {formData.mode === "ONLINE" && (
                        <div className="session-form-group full">
                            <label>Google Meet Link</label>

                            <input
                                type="url"
                                name="meetingUrl"
                                value={formData.meetingUrl}
                                onChange={handleChange}
                                placeholder="https://meet.google.com/..."
                                required
                            />
                        </div>
                    )}

                    <div className="session-form-group full">
                        <label>Conversation ID</label>

                        <input
                            type="number"
                            name="conversationId"
                            value={formData.conversationId}
                            onChange={handleChange}
                            placeholder="Enter conversation ID"
                            required
                        />
                    </div>
                </div>

                <div className="session-form-actions">
                    <button
                        type="button"
                        className="session-form-cancel"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="session-form-submit"
                    >
                        Schedule Session
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SessionForm;

