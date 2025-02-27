import { useState } from "react";
import style from "../styles/ProfileForm.module.css";

const ProfileForm = () => {
    const [data, setData] = useState({ name: "", title: "", email: "", bio: "", image: null });
    const [errors, setErrors] = useState({ image: "", general: "" });
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        if (e.target.name === "image") {
            const file = e.target.files[0];
            if (file && file.size > 2000000) {
                setErrors({ ...errors, image: "Image must be less than 2MB." });
            } else {
                setData({ ...data, image: file });
                setErrors({ ...errors, image: "" });
            }
        } else {
            setData({ ...data, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const formData = new FormData();
        formData.append("name", data.name.trim());
        formData.append("email", data.email.trim());
        formData.append("title", data.title.trim());
        formData.append("bio", data.bio.trim());
        if (data.image) formData.append("image", data.image);

        try {
            const response = await fetch("https://web.ics.purdue.edu/~severg/profile-app/send-data.php", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();

            if (result.success) {
                setData({ name: "", title: "", email: "", bio: "", image: null });
                setErrors({ image: "", general: "" });
                setSuccessMessage("Data submitted successfully.");
            } else {
                setErrors({ image: "", general: result.message });
                setSuccessMessage("");
            }
        } catch (error) {
            setErrors({ image: "", general: "Submission failed. Please try again." });
        }
        setSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className={style.profileForm}>
            <div className={style.formGroup}>
                <input type="text" name="name" placeholder="Name" required value={data.name} onChange={handleChange} />
            </div>
            <div className={style.formGroup}>
                <input type="email" name="email" placeholder="Email" required value={data.email} onChange={handleChange} />
            </div>
            <div className={style.formGroup}>
                <input type="text" name="title" placeholder="Title" required value={data.title} onChange={handleChange} />
            </div>
            <div className={style.formGroup}>
                <textarea name="bio" placeholder="Bio..." required value={data.bio} onChange={handleChange} maxLength={200}></textarea>
            </div>
            <div className={style.formGroup}>
                <label htmlFor="image">Choose a profile picture:</label>
                <input type="file" id="image" name="image" accept="image/*" onChange={handleChange} />
                {errors.image && <p className={style.error}>{errors.image}</p>}
            </div>
            <button 
                type="submit" 
                disabled={submitting || !!errors.image || !data.name.trim() || !data.bio.trim() || !data.email.trim() || !data.title.trim() || !data.image}
            >
                {submitting ? "Submitting..." : "Submit"}
            </button>
            {errors.general && <p className={style.error}>{errors.general}</p>}
            {successMessage && <p className={style.success}>{successMessage}</p>}
        </form>
    );
};

export default ProfileForm;
