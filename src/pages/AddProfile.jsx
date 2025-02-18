import '../App.css';
import style from "../styles/card.module.css";
import React, { useState, useEffect } from 'react';
import About from "../components/About";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Wrapper from '../components/Wrapper';
import ProfileForm from '../components/ProfileForm';

const AddProfile = () => {
  return (
    <>
      <main>
        <Wrapper>
          <ProfileForm />
        </Wrapper>
      </main>
    </>
  );
};

export default AddProfile;

