import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import { useNavigate } from "react-router-dom";
const ProfileEditPage = () => {
  const { id } = useParams();
  useEffect(() => {
    fetch(
      `https://web.ics.purdue.edu/~severg/profile-app/fetch-data-with-id.php?id=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
      });
  }, [id]);
  const handleDelete = () => {
    if(!window.confirm("Are you sure you want to delete this profile?")) {
      return;
    }
    fetch(
      `https://web.ics.purdue.edu/~severg/profile-app/delete-profile.php?id=${id}`,
      {
        method: "DELETE",
      }
    ).then((data) => data.json())
    .then((data) => {
      if(data.error) {
        alert(data.error);
      } else {
        alert("Profile Deleted");
        navigate("/");      
      }
    });
  };

  return (
    <Wrapper>
      <h1>Edit Profile</h1>
      <button onClick={handleDelete}>Delete Profile</button>
    </Wrapper>
  );
};

export default ProfileEditPage;