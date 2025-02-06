import {useState} from "react";
const ProfileForm = () => {
    const [data, setData] = useState({ name: "", title: "", email: "", bio: "",image: null });
    const[errors, setErrors] = useState({image: "", general: ""});
    const[submitting, setSubmitting] = useState(false);
    const handleChange = (e) => {
        if(e.target.name === "image"){
            const file = e.target.files[0];
            if(file.size > 2000000){
                setErrors({...errors, image: "Image must be less than 2mb."});
            }
            else{
                setData({...data, image: file});
            }
        }
        else{
            setData({ ...data, [e.target.name]: e.target.value });}
    };
    const handleSubmit = async (e) => {
        setSubmitting(true);
        e.preventDefault();
        formData.append("name", data.name.trim());
        formData.append("email", data.email.trim());
        formData.append("title", data.title.trim());
        formData.append("bio", data.bio.trim());
        if (data.image) formData.append("image", data.image);
        const formData = new FormData();
        try{
            const response = await fetch("https://web.ics.purdue.edu/~severg/profile-app/send-data.php", {
                method: "POST",
                body: formData,
        });
        const result = await response.json()
        if(result.success){
            setData({name: "", title: "", email: "", bio: "", image: null})
            setErrors({image: "", general: ""});
            setSuccessMessage("Data submitted successfully.")
        }
        else{
            setErrors({image: "", general: result.message})
            setSuccessMessage("");
        }
        }catch(error){
            setErrors({image: "", general: ""});
        }
    };
    return (
        <form onSubmit = {handleSubmit} className="profile-form">
            <input type="text" name="name" placeholder="Name" required value={data.name} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" required value={data.email} onChange={handleChange}/>
            <input type="text" name="title" placeholder="Title" required value={data.title} onChange={handleChange}/>
            <textarea name="bio" placeholder="Bio..." required value={data.bio}onChange={handleChange}></textarea>
            <label htmlFor="image">Choose a profile picture:</label>
            <input type="file" id="image" name="image" accept="image/jpg image/jpeg image/png image/gif" maxLength={200} required onChange={handleChange}></input>
            {errors.image && <p>{errors.image}</p>}
            <button type="submit" disabled={submitting || errors.image !=="" || data.name !==""|| data.bio !==""|| data.email !==""|| data.title !==""|| data.image ===null ? true: false}>Submit</button>
            {errors.general && <p>{errors.general}</p>}
        </form>
    )
}
export default ProfileForm;