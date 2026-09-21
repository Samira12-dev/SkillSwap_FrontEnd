
import { useContext,useEffect,useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { updateProfile } from "../services/userService";
import "../App.css";

function EditProfile(){
    const { user,updateUser }=useContext(AuthContext);
    const navigate=useNavigate();

    const [formData,setFormData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        city:"",
        bio:"",
        photo:""
    });

    const [error,setError]=useState("");
    const [saving,setSaving]=useState(false);

    useEffect(()=>{
        if(!user)return;

        setFormData({
            firstName:user.firstName||"",
            lastName:user.lastName||"",
            email:user.email||"",
            city:user.city||"",
            bio:user.bio||"",
            photo:user.photo||""
        });
    },[user]);

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError("");
        setSaving(true);

        try{
            const updated=await updateProfile(user.id,formData);
            updateUser(updated);
            navigate(user.role==="ADMIN"?"/admin/profile":"/profile");
        }catch(err){
            console.error("UPDATE PROFILE ERROR:",err);
            setError("Could not update your profile. Please try again.");
        }finally{
            setSaving(false);
        }
    };

    const profilePath=user?.role==="ADMIN"?"/admin/profile":"/profile";

    return(
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

                            {error&&<p className="form-error">{error}</p>}

                            <div className="edit-form-grid">
                                <div className="edit-form-group">
                                    <label>First name <span className="required">*</span></label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
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
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="edit-profile-side">
                        <div className="edit-profile-card">
                            <h3>Profile Photo</h3>

                            <div className="edit-photo-box">
                                <img
                                    src={formData.photo||""}
                                    alt="Profile"
                                />

                                <div className="edit-form-group full-width">
                                    <label>Photo URL</label>
                                    <input
                                        type="text"
                                        name="photo"
                                        value={formData.photo}
                                        onChange={handleChange}
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="edit-profile-card">
                            <h3>Account</h3>

                            <div className="account-info">
                                <span>Member since</span>
                                <strong>
                                    {user?.createdAt
                                        ?new Date(user.createdAt).toLocaleDateString()
                                        :"N/A"}
                                </strong>
                            </div>

                            <div className="account-info">
                                <span>Account type</span>
                                <strong>{user?.role||"USER"}</strong>
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
                        {saving?"Saving...":"Save changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditProfile;