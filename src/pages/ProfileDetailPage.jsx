import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import style from "../styles/profiledetail.module.css";
import { AuthContext } from "../contexts/AuthContext";

const ProfileDetailPage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const { isLogin } = useContext(AuthContext);

  useEffect(() => {
    fetch(`https://web.ics.purdue.edu/~severg/profile-app/fetch-data-with-id.php?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [id]);

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <main>
        <Wrapper>
          <h1>{profile.name}</h1>
          <p>{profile.bio}</p>
          <p><a href={`mailto:${profile.email}`}>{profile.email} </a></p>
          <p>{profile.title}</p>
          <img className={style['profile-card__img']} src={profile.image_url} alt={profile.name} />
          {isLogin && <Link to='edit'>Edit</Link>}
        </Wrapper>
      </main>
    </>
  );
};

export default ProfileDetailPage;
