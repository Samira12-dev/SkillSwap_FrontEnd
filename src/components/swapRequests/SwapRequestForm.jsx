import { Send } from "lucide-react";
import { useState } from "react";
import "../../App.css";

function SwapRequestForm({
    receiverId,
    skills,
    onSubmit
}) {
    const [formData, setFormData] = useState({
        receiverId: receiverId || "",
        skillOfferedId: "",
        skillWantedId: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (onSubmit) {
            onSubmit(formData);
        }
    };

    return (
        <form
            className="swap-request-form"
            onSubmit={handleSubmit}
        >

            <div className="form-group">
                <label>Skill I can offer</label>

                <select
                    name="skillOfferedId"
                    value={formData.skillOfferedId}
                    onChange={handleChange}
                    required
                >
                    <option value="">
                        Select a skill
                    </option>

                    {skills &&
                        skills.map((skill) => (
                            <option
                                key={skill.id}
                                value={skill.id}
                            >
                                {skill.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="form-group">
                <label>Skill I want to learn</label>

                <select
                    name="skillWantedId"
                    value={formData.skillWantedId}
                    onChange={handleChange}
                    required
                >
                    <option value="">
                        Select a skill
                    </option>

                    {skills &&
                        skills.map((skill) => (
                            <option
                                key={skill.id}
                                value={skill.id}
                            >
                                {skill.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="form-group">
                <label>Message</label>

                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write a message..."
                    rows="4"
                    required
                />
            </div>
            <button type="submit" className="request-btn accept">
                <Send size={14} />
                Send Swap Request
            </button>

        </form>
    );
}

export default SwapRequestForm;

