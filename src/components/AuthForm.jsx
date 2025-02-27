import { useState, useEffect, useContext } from 'react';
import style from "../styles/profileform.module.css";
import { useNavigate } from 'react-router-dom';
import { AuthContext }  from '../contexts/AuthContext';

const AuthForm = ({ isRegister = false }) => {
    const { login } = useContext(AuthContext);
    const [data, setData] = useState({ username: "", password: "", email: "" });
    const [errors, setErrors] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => { 
        e.preventDefault();
        setSubmitting(true);

        const formData = new FormData();
        formData.append("username", data.username.trim());
        formData.append("password", data.password.trim());
        if (isRegister) formData.append("email", data.email.trim());

        try {
            const response = await fetch("https://web.ics.purdue.edu/~severg/profile-app/auth.php?", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();

            if (result.success) {
                setData({ username: "", password: "", email: "" });
                setErrors("");
                setSuccessMessage(result.success);
                navigate("/");
            } else {
                setErrors(result.message);
                setSuccessMessage("");
            }
        } catch (error) {
            setErrors("Submission failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={style["profile-form"]}>
            <input type="text" name="username" placeholder="Username" required value={data.username} onChange={handleChange} />
            {isRegister && <input type="email" name="email" placeholder="Email" required value={data.email} onChange={handleChange} />}
            <input type="password" name="password" placeholder="Password" minLength="8" required value={data.password} onChange={handleChange} />
            <button type="submit" disabled={submitting || data.username.trim() === "" || (isRegister && data.email.trim() === "") || data.password.trim() === ""}>
                {submitting ? "Submitting..." : "Submit"}
            </button>
            {errors && <p className={style.error}>{errors}</p>}
            {successMessage && <p className={style.success}>{successMessage}</p>}
        </form>
    );
};

export default AuthForm;
