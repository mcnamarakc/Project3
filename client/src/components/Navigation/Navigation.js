import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';
import AuthDropdown from '../../components/AuthDropdown/AuthDropdown';
import "./Navigation.css";

class Navigation extends Component {
  static contextType = AuthContext;

  state = {
    collapsed: true
  }

  toggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const { user } = this.context;
    const { collapsed } = this.state;
    const targetClass = `collapse navbar-collapse ${!collapsed && 'show'}`;
    const togglerClass = `navbar-toggler ${collapsed && 'collapsed'}`;

    return (
      <div className='Navigation'>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark mb-3'>
          <Link className='navbar-brand nav-link mr-0' to='/' onClick={this.toggleCollapse}><i className="fas fa-spray-can"></i></Link><div id="logoTagTitle">Urban Art Exploration </div>
          <button className={togglerClass} onClick={this.toggleCollapse} data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className={targetClass} id='navbarSupportedContent'>
            <ul id="navBarLinksHide" className='navbar-nav mr-auto'>
              
              {user &&
                <li className='nav-item'>
                  <Link className='nav-link' to='/apiservice' onClick={this.toggleCollapse}>API</Link>
                </li>
              }
              {user &&
                <li className='nav-item'>
                  <Link className='nav-link' to='/add' onClick={this.toggleCollapse}>Add</Link>
                </li>
              }
              {user &&
                <li className='nav-item'>
                  <Link className='nav-link' to='/favorites' onClick={this.toggleCollapse}>Favorites</Link>
                </li>
              }
              {user && 
                <li className='nav-item'>
                  <Link className='nav-link' to='/user' onClick={this.toggleCollapse}>Update Profile</Link>
                </li>
              }
            </ul>
            <ul className='navbar-nav'>
              {user
                ? <AuthDropdown onClick={this.toggleCollapse} />
                : <>
                  <li className='nav-item'><Link className='nav-link' to='/login' onClick={this.toggleCollapse}>Login</Link></li>
                  <li className='nav-item'><Link className='nav-link' to='/register' onClick={this.toggleCollapse}>Register</Link></li>
                </>}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navigation;
