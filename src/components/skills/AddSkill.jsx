
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdArrowBack, MdAdd } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getAllSkills, addSkillToUser } from "../../services/skillService";
import "../../App.css";


function AddSkill() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [skills, setSkills] = useState([]);

    const [formData, setFormData] = useState({
        skillId: "",
        type: "",
        level: ""
    });

    useEffect(() => {

        getAllSkills()
            .then((data) => {
                setSkills(data.content || []);
            })
            .catch((error) => {
                console.error("Error loading skills:", error);
            });

    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!user) {
            return;
        }

        try {

            await addSkillToUser(user.id, {
                skillId: Number(formData.skillId),
                type: formData.type,
                level: formData.level
            });

            navigate("/skills");

        } catch (error) {

            console.error("Error adding skill:", error);

        }
    };

    return (
        <div className="add-skill-page">

            <div className="add-skill-header">

                <Link
                    to="/skills"
                    className="back-link"
                >
                    <MdArrowBack />
                    Back to My Skills
                </Link>

                <h2>Add Skill</h2>

                <p>
                    Add a skill you can offer or a skill you want to learn.
                </p>

            </div>


            <div className="add-skill-card">

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>
                            Skill
                        </label>

                        <select
                            name="skillId"
                            value={formData.skillId}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select a skill
                            </option>

                            {skills.map((skill) => (

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

                        <label>
                            Skill Type
                        </label>

                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select type
                            </option>

                            <option value="OFFER">
                                I can offer
                            </option>

                            <option value="WANTED">
                                I want to learn
                            </option>

                        </select>

                    </div>


                    <div className="form-group">

                        <label>
                            Skill Level
                        </label>

                        <select
                            name="level"
                            value={formData.level}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select level
                            </option>

                            <option value="BEGINNER">
                                Beginner
                            </option>

                            <option value="INTERMEDIATE">
                                Intermediate
                            </option>

                            <option value="ADVANCED">
                                Advanced
                            </option>

                        </select>

                    </div>


                    <button
                        type="submit"
                        className="add-skill-submit"
                    >
                        <MdAdd />
                        Add Skill
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AddSkill;

