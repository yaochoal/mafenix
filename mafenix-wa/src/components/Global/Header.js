// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loginnav from './Loginnav'
// Assets
import './css/Header.css';

class Header extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  };
 
  render() {
    const { items } = this.props;
    
    return (
        <nav className="navbar navbar-default ">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navigation">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="" href="/"><img src="/assets/img/logo.png" width="270px" height="150px" alt=""/></a>
                </div>

                <div className="collapse navbar-collapse yamm" id="navigation">
                    <Loginnav/>
                    <ul className="main-nav nav navbar-nav navbar-right">
            {
              items && items.map(
                (item, key) => <li className="wow fadeInDown " data-wow-delay="1s" key={key}>
                <Link  to={item.url}>{item.title}</Link></li>
              )
            }
          </ul>
              </div>
            </div>
        </nav>
    );
  }
}

export default Header;
