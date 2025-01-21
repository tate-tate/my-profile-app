import img from '../assets/senior-photo.jpg';
import "../styles/card.css";

const Card1 = () => {
    const name = 'Tate Sever';
    const title = 'Data Visualization Student';
    const email = 'gabrieltsever@gmail.com';

    return(
        <div className="profile-card">
            <div className="profile-card__img">
                <img src= {img} alt="Tate Sever - Headshot"/>
            </div>
            <div className="profile-card__content">
                <p>{name}</p>
                <p>{title}</p>
                <p><a href={`mailto:${email}`}>{email}</a></p>
            </div>
        </div>
    );
}
export default Card1;