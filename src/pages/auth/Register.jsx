import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdSwapHoriz, MdArrowBack, MdArrowForward } from "react-icons/md";
import * as yup from "yup";
import "../../App.css";
import { register as registerUser } from "../../services/authService";

const schema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(8, "Password must contain at least 8 characters").required("Password is required"),
    city: yup.string().required("City is required"),
    bio: yup.string().max(1000, "Bio must not exceed 1000 characters"),
    photo: yup.string().nullable()
});

function Register() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            city: "",
            bio: "",
            photo: null
        }
    });

    const onSubmit = async (data) => {
        try {
            await registerUser(data);
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="register-page">
            <div className="register-left">
                <div className="register-logo">
                    <div className="register-logo-icon">
                        <MdSwapHoriz />
                    </div>
                    SkillSwap
                </div>

                <div className="register-left-content">
                    <h1>
                        Join people
                        <br />
                        exchanging skills.
                    </h1>

                    <p>
                        Learn new skills, share your knowledge,
                        and build meaningful connections through
                        SkillSwap.
                    </p>
                </div>
            </div>

            <div className="register-right">
                <div className="register-form-container">
                    <div className="register-header">
                        <h1>Create your account</h1>
                        <p>Join SkillSwap and start exchanging skills.</p>
                    </div>

                    <form
                        className="register-form"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <h2>Account information</h2>

                        <div className="form-row">
                            <div className="form-group">
                                <label>
                                    First name <span className="required">*</span>
                                </label>

                                <input
                                    type="text"
                                    placeholder="First name"
                                    {...register("firstName")}
                                />

                                {errors.firstName && (
                                    <p className="error-message">
                                        {errors.firstName.message}
                                    </p>
                                )}
                            </div>

                            <div className="form-group">
                                <label>
                                    Last name <span className="required">*</span>
                                </label>

                                <input
                                    type="text"
                                    placeholder="Last name"
                                    {...register("lastName")}
                                />

                                {errors.lastName && (
                                    <p className="error-message">
                                        {errors.lastName.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>
                                Email <span className="required">*</span>
                            </label>

                            <input
                                type="email"
                                placeholder="you@example.com"
                                {...register("email")}
                            />

                            {errors.email && (
                                <p className="error-message">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="form-group">
                            <label>
                                Password <span className="required">*</span>
                            </label>

                            <input
                                type="password"
                                placeholder="At least 8 characters"
                                {...register("password")}
                            />

                            {errors.password && (
                                <p className="error-message">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <h2>Profile</h2>

                        <div className="form-group">
                            <label>
                                City <span className="required">*</span>
                            </label>

                            <input
                                type="text"
                                placeholder="Beni Mellal"
                                {...register("city")}
                            />

                            {errors.city && (
                                <p className="error-message">
                                    {errors.city.message}
                                </p>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Short bio</label>

                            <textarea
                                placeholder="Tell us a little about yourself..."
                                {...register("bio")}
                            />

                            {errors.bio && (
                                <p className="error-message">
                                    {errors.bio.message}
                                </p>
                            )}
                        </div>

                        <div className="register-actions">
                            <Link
                                to="/"
                                className="register-back-btn"
                            >
                                <MdArrowBack />
                                Back
                            </Link>

                            <button
                                type="submit"
                                className="register-btn"
                            >
                                Create account
                                <MdArrowForward />
                            </button>
                        </div>
                    </form>

                    <p className="register-login">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;