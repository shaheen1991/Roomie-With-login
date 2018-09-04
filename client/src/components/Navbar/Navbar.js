import axios from 'axios';
import React, { Component } from "react";
import { slide as Menu } from 'react-burger-menu';
import { Link } from "react-router-dom";
import "./Navbar.css";
import { withRouter } from 'react-router-dom';
import { update } from '../../services/withUser';
import LoginButton from '../LoginButton';
import LoginMenu from '../LoginMenu';



// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const Navbar = props => 

  {
    const { user } = props;
    const username = user ? user.username : null;
    const handleLogIn = () => {
      props.history.push('/login');
    };
    const handleLogOut = () => {
      axios.delete('/api/auth')
        .then(() => {
          // unsets the currently logged in user. all components wrapped in withUser
          // will be updated with a null user and rerender accordingly
          update(null);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return(
      <Menu>
  <nav className="navbar navbar-expand-lg navbar-light" >
  <div>
      <img alt="" id= "roomieIconNav" src="/img/roomieIconWhite.png"/>
     </div>
    
    <div className="navbar-brand">
      Roomie
    </div>

    <div>
        <a
          className={
            window.location.pathname === "/calendar"
              ? "nav-item active"
              : "nav-item"
          }
        >
        {user ?
          <Link to="/calendar" className="nav-link">
            Calendar
          </Link>
          : <div/>}
        </a>
        <a
          className={
            window.location.pathname === "/smacktalk"
              ? "nav-item active"
              : "nav-item"
          }
        >
        {user ?
          <Link to="/smacktalk" className="nav-link">
            SmackTalk
          </Link>
          : <div/>}
        </a>
        <a
          className={
            window.location.pathname === "/choreform"
              ? "nav-item active"
              : "nav-item"
          }
        >
        {user ?
          <Link to="/choreform" className="nav-link">
            Chores
          </Link>
          : <div/>}
        </a>
        {user ?
       <LoginMenu username={username} onLogOut={handleLogOut} />
       : <LoginButton onClick={handleLogIn} />}

    </div>
  </nav>
      </Menu>)

  }

export default withRouter(Navbar);

