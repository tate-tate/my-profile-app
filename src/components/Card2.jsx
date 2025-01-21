import img from '../assets/manson.jpg';
import "../styles/card.css";

const Card2 = () => {
    const name = 'Manson';
    const title = 'A Cute Cat';
    const email = 'manson@manson.com';

    return(
        <div className="profile-card">
            <div className="profile-card__img">
                <img src= {img} alt="Manson" width="350px" height="500px"/>
            </div>
            <div className="profile-card__content">
                <p>{name}</p>
                <p>{title}</p>
                <p><a href={`mailto:${email}`}>{email}</a></p>
            </div>
        </div>
    );
}
export default Card2;