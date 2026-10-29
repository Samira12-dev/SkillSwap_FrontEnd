import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ImagePlus, Trash2 } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { updateProfile, uploadProfilePhoto } from "../services/userService";
import { getErrorMessage } from "../utils/format";
import Avatar from "../components/ui/Avatar";
import "../App.css";

const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

function EditProfile() {
    const { user, updateUser } = useContext(AuthContext);
    const toast = useToast();
    const navigate = useNavigate();
    const photoInputRef = useRef(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        city: "",
        bio: ""
    });

    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState("");
    const [photoError, setPhotoError] = useState("");
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!user) return;

        setFormData({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            city: user.city || "",
            bio: user.bio || ""
        });
    }, [user]);

    useEffect(() => {
        if (!photoFile) {
            setPhotoPreview("");
            return undefined;
        }

        const objectUrl = URL.createObjectURL(photoFile);
        setPhotoPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [photoFile]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setPhotoError("");

        const hasValidType =
            ALLOWED_PHOTO_TYPES.includes(file.type) ||
            /\.(jpe?g|png|webp)$/i.test(file.name);

        if (!hasValidType) {
            setPhotoError("Choose a JPEG, PNG, or WebP image.");
            e.target.value = "";
            return;
        }

        if (file.size > MAX_PHOTO_BYTES) {
            setPhotoError("The image must be 5 MB or smaller.");
            e.target.value = "";
            return;
        }

        setPhotoFile(file);
    };

    const clearSelectedPhoto = () => {
        setPhotoFile(null);
        setPhotoError("");

        if (photoInputRef.current) {
            photoInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSaving(true);

        try {
            const updatedProfile = await updateProfile(user.id, formData);
            let finalProfile = updatedProfile;

            if (photoFile) {
                try {
                    const uploadedProfile = await uploadProfilePhoto(
                        user.id,
                        photoFile
                    );

                    finalProfile = {
                        ...updatedProfile,
                        ...uploadedProfile
                    };
                } catch (uploadError) {
                    updateUser(updatedProfile);
                    setError(
                        `Your details were saved, but the photo could not be uploaded. ${getErrorMessage(
                            uploadError,
                            "Please try again."
                        )}`
                    );
                    return;
                }
            }

            updateUser(finalProfile);
            setPhotoFile(null);
            toast.success("Profile updated successfully.");
            navigate(user.role === "ADMIN" ? "/admin/profile" : "/profile");
        } catch (err) {
            setError(
                getErrorMessage(
                    err,
                    "Could not update your profile. Please try again."
                )
            );
        } finally {
            setSaving(false);
        }
    };

    const profilePath = user?.role === "ADMIN" ? "/admin/profile" : "/profile";

    return (
        <div className="edit-profile-page">
            <div className="edit-profile-header">
                <div>
                    <h2>Edit Profile</h2>
                    <p>Update your personal information and public profile.</p>
                </div>
            </div>

            <form className="edit-profile-form" onSubmit={handleSubmit}>
                <div className="edit-profile-layout">
                    <div className="edit-profile-main">
                        <div className="edit-profile-card">
                            <h3>Personal Information</h3>

                            {error && <p className="form-error">{error}</p>}

                            <div className="edit-form-grid">
                                <div className="edit-form-group">
                                    <label>First name <span className="required">*</span></label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        maxLength={120}
                                        required
                                    />
                                </div>

                                <div className="edit-form-group">
                                    <label>Last name <span className="required">*</span></label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        maxLength={120}
                                        required
                                    />
                                </div>

                                <div className="edit-form-group full-width">
                                    <label>Email <span className="required">*</span></label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="edit-form-group full-width">
                                    <label>City <span className="required">*</span></label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        maxLength={100}
                                        required
                                    />
                                </div>

                                <div className="edit-form-group full-width">
                                    <label>Bio</label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        placeholder="Tell people a little about yourself..."
                                        maxLength={1000}
                                    />
                                    <span className="edit-field-count">
                                        {formData.bio.length}/1000
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="edit-profile-side">
                        <div className="edit-profile-card">
                            <h3>Profile Photo</h3>

                            <div className="edit-photo-box">
                                <div className="edit-photo-preview">
                                    <Avatar
                                        user={{
                                            firstName: formData.firstName,
                                            lastName: formData.lastName,
                                            photo: photoPreview || user?.photo
                                        }}
                                        size="xl"
                                    />
                                </div>

                                <input
                                    ref={photoInputRef}
                                    type="file"
                                    className="edit-photo-input"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handlePhotoChange}
                                />

                                <div className="edit-photo-actions">
                                    <button
                                        type="button"
                                        className="change-photo-btn"
                                        onClick={() => photoInputRef.current?.click()}
                                        disabled={saving}
                                    >
                                        <ImagePlus size={15} />
                                        {photoFile ? "Choose another" : "Choose image"}
                                    </button>

                                    {photoFile && (
                                        <button
                                            type="button"
                                            className="edit-photo-clear"
                                            onClick={clearSelectedPhoto}
                                            disabled={saving}
                                        >
                                            <Trash2 size={14} />
                                            Cancel selection
                                        </button>
                                    )}
                                </div>

                                {photoError && (
                                    <p className="edit-photo-error" role="alert">
                                        {photoError}
                                    </p>
                                )}

                                <p>JPEG, PNG, or WebP. Maximum size 5 MB.</p>
                            </div>
                        </div>

                        <div className="edit-profile-card">
                            <h3>Account</h3>

                            <div className="account-info">
                                <span>Member since</span>
                                <strong>
                                    {user?.createdAt
                                        ? new Date(user.createdAt).toLocaleDateString()
                                        : "N/A"}
                                </strong>
                            </div>

                            <div className="account-info">
                                <span>Account type</span>
                                <strong>{user?.role || "USER"}</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="edit-profile-actions">
                    <Link to={profilePath} className="cancel-btn">Cancel</Link>
                    <button
                        type="submit"
                        className="save-profile-btn"
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Save changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditProfile;
