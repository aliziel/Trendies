import React from 'react';
import Login from '../components/login';
import Signup from '../components/signup';
import Logo from '../rocket-launch.svg';

import '../App.css';

function Navbar() {

  const [isLoggedIn, setLoggedIn] = React.useState(false);

  const handleVis = () => {
    if(isLoggedIn) return "hidden";
    return "visible";
  }

  return (
    <div id ='navbar'>
      <div id='titleLogo'>
        <img src={Logo}/>
      </div>
      <div id='titleName'>
        TRENDIE$
      </div>
      <div id="signup-login">
        <div id='Signup'>
          <Signup isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/> 
        </div>
        <div id='Login'>
          <Login isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>
        </div>
      </div>
    </div>
  )
}

export default Navbar;