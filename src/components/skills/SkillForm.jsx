import { useState } from "react";
import "../../App.css";

function SkillForm({ onSubmit, initialData }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        level: "beginner",
        ...initialData,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    return (
        <form className="skill-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Skill Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Guitar Basics"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe what you can teach..."
                    rows="4"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Music, Programming, Language"
                />
            </div>

            <div className="form-group">
                <label htmlFor="level">Level</label>
                <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>
            </div>

            <div className="form-actions">
                <button type="submit" className="btn-sm green">
                    {initialData ? "Update Skill" : "Add Skill"}
                </button>
            </div>
        </form>
    );
}

export default SkillForm;
