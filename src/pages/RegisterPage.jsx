import Wrapper from "../components/Wrapper";
import AuthForm from "../components/AuthForm";
import { Link } from "react-router";

const RegisterPage = () => {
    return (
        <Wrapper>
            <h1 className="title">Register</h1>
            <AuthForm isRegister={true} />
        </Wrapper>
    );
};
export default RegisterPage;