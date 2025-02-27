import Wrapper from "../components/Wrapper";
import AuthForm from "../components/AuthForm";
import { Link } from "react-router";

const Login = () => {
    return (
        <Wrapper>
            <h1 className="title">Login</h1>
            <AuthForm isRegister={false} />
            <Link to="/register">Don't have an account? Register here.</Link>
        </Wrapper>
    );
};
export default Login;