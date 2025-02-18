import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <Wrapper>
            <h1>404: Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/">Go back to the homepage</Link>
        </Wrapper>
    )
}
export default NotFound;