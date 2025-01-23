import './App.css';
import About from "./components/About";
import Navbar from "./components/Navbar";
import Card1 from "./components/Card1";
import Card2 from "./components/Card2";
import Card from "./components/Card";
import seniorphoto from './assets/senior-photo.jpg';
import manson from "./assets/manson.jpg";
import PropTypes from 'prop-types';
import Wrapper from './components/Wrapper';

const App = () => {

  const profiles = [
    {email: 'severg@purdue.edu',
    name: 'Tate Sever',
    title: 'Student',
    img: seniorphoto},
    {email: 'manson@manson.net',
     name: 'Manson',
     title: 'Cat',
     img: manson
    }

  ]

  return (
    <>
        <header>
          <Navbar />
        </header>
        <main>
          <Wrapper>
              <About />
          </Wrapper>
          <Wrapper>
              <div className = "profile-cards">
                {profiles.map(profile => <Card key={profile.email} img={profile.img} name={profile.name} title = {profile.title} email= {profile.email} {...profile} />)}
              </div>
          </Wrapper>
        </main>
    </>
  )
}

export default App;
