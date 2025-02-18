import '../App.css';
import style from "../styles/card.module.css";
import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Wrapper from '../components/Wrapper';


const AboutPage = () => {  
  return (
    <>
      <main>
        <Wrapper>
        <div>
            <h2>About</h2>
            <p>This is a profile app.</p>
        </div>
        </Wrapper>
      </main>
    </>
  );
};

export default AboutPage;

