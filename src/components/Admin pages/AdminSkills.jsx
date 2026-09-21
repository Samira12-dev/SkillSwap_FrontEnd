
import { useEffect,useState } from "react";
import { MdSearch,MdVisibility,MdEdit,MdDelete,MdClose,MdAdd } from "react-icons/md";
import "../../App.css";
import { getAllSkills,getAllSkillsForSearch,createSkill,updateSkill,deleteSkill } from "../../services/skillService";

function AdminSkills(){
    const [search,setSearch]=useState("");
    const [skills,setSkills]=useState([]);
    const [allSkills,setAllSkills]=useState([]);
    const [currentPage,setCurrentPage]=useState(0);
    const [totalPages,setTotalPages]=useState(0);
    const [size]=useState(10);
    const [selectedSkill,setSelectedSkill]=useState(null);
    const [showView,setShowView]=useState(false);
    const [showForm,setShowForm]=useState(false);
    const [formData,setFormData]=useState({name:"",category:""});

    const getSkills=async()=>{
        try{
            const data=await getAllSkills(currentPage,size);
            setSkills(data.content);
            setTotalPages(data.totalPages);
            const allData=await getAllSkillsForSearch();
            setAllSkills(allData);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(()=>{
        getSkills();
    },[currentPage,size]);

    const filteredSkills=allSkills.filter((skill)=>
        skill.name?.toLowerCase().includes(search.toLowerCase())||
        skill.category?.toLowerCase().includes(search.toLowerCase())
    );

    const displayedSkills=search?filteredSkills:skills;

    const handleView=(skill)=>{
        setSelectedSkill(skill);
        setShowView(true);
    };

    const handleAdd=()=>{
        setSelectedSkill(null);
        setFormData({name:"",category:""});
        setShowForm(true);
    };

    const handleEdit=(skill)=>{
        setSelectedSkill(skill);
        setFormData({
            name:skill.name||"",
            category:skill.category||""
        });
        setShowForm(true);
    };

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            if(selectedSkill){
                await updateSkill(selectedSkill.id,formData);
            }else{
                await createSkill(formData);
            }
            setShowForm(false);
            setSelectedSkill(null);
            setFormData({name:"",category:""});
            getSkills();
        }catch(error){
            console.log(error);
        }
    };

    const handleDelete=async(skillId)=>{
        const confirmDelete=window.confirm("Are you sure you want to delete this skill?");
        if(!confirmDelete)return;
        try{
            await deleteSkill(skillId);
            getSkills();
        }catch(error){
            console.log(error);
        }
    };

    const closeView=()=>{
        setShowView(false);
        setSelectedSkill(null);
    };

    const closeForm=()=>{
        setShowForm(false);
        setSelectedSkill(null);
        setFormData({name:"",category:""});
    };

    const handleSearch=(e)=>{
        setSearch(e.target.value);
    };

    return(
        <div className="admin-page">
            <div className="admin-header">
                <div>
                    <h2>Skills</h2>
                    <p>Manage skills available on the platform.</p>
                </div>
                <button className="admin-add-button" onClick={handleAdd}>
                    <MdAdd/>
                    Add Skill
                </button>
            </div>

            <div className="admin-table-card">
                <div className="admin-table-header">
                    <h3>All Skills</h3>
                    <div className="admin-search">
                        <MdSearch/>
                        <input
                            type="text"
                            placeholder="Search skills..."
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>
                </div>

                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Skill</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedSkills.length>0?(
                            displayedSkills.map((skill)=>(
                                <tr key={skill.id}>
                                    <td>{skill.name}</td>
                                    <td>{skill.category}</td>
                                    <td>
                                        <div className="admin-actions-small">
                                            <button onClick={()=>handleView(skill)} title="View">
                                                <MdVisibility/>
                                            </button>
                                            <button onClick={()=>handleEdit(skill)} title="Edit">
                                                <MdEdit/>
                                            </button>
                                            <button onClick={()=>handleDelete(skill.id)} title="Delete">
                                                <MdDelete/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ):(
                            <tr>
                                <td colSpan="3" style={{textAlign:"center",padding:"30px"}}>
                                    No skills found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {!search&&(
                <div className="pagination">
                    <button
                        onClick={()=>setCurrentPage(currentPage-1)}
                        disabled={currentPage===0}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage+1} of {totalPages}</span>
                    <button
                        onClick={()=>setCurrentPage(currentPage+1)}
                        disabled={currentPage+1>=totalPages}
                    >
                        Next
                    </button>
                </div>
            )}

            {showView&&selectedSkill&&(
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <div className="admin-modal-header">
                            <h3>Skill Details</h3>
                            <button onClick={closeView}>
                                <MdClose/>
                            </button>
                        </div>
                        <div className="admin-user-details">
                            <p><strong>Skill:</strong>{selectedSkill.name}</p>
                            <p><strong>Category:</strong>{selectedSkill.category}</p>
                        </div>
                    </div>
                </div>
            )}

            {showForm&&(
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <div className="admin-modal-header">
                            <h3>{selectedSkill?"Edit Skill":"Add Skill"}</h3>
                            <button onClick={closeForm}>
                                <MdClose/>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Skill name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="admin-save-button">
                                {selectedSkill?"Save Changes":"Add Skill"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminSkills;

