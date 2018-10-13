import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from '../../store';

class Loginnav extends Component {
constructor() {
    super()
    this.state = {  s_users: []}
  }
  render() {
    if (localStorage.getItem('jwtToken')) {
    return (
     <div className="button navbar-right">
          <div className="dealer-face">
            <Link  to="/login">
              <img src={`${store.getState().avatar}`} width= "70px" alt ="" className="img-circle"/> 
              </Link>          
            </div>
     </div>
    )}else{
    	return (
     <div className="button navbar-right">
           <Link  to="/login">
           <button className="navbar-btn nav-button wow bounceInRight login" data-wow-delay="0.45s">Log in</button>
            </Link>
            <Link to="/register">
           <button className="navbar-btn nav-button wow fadeInRight"  data-wow-delay="0.48s">Sign up</button>
           </Link> 
     </div>
    
    )
    }
  }
}

export default Loginnav;
