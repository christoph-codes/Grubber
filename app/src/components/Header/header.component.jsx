import React from 'react';
import './header.styles.scss';

import { Navbar, Nav } from 'react-bootstrap'

import { NavLink } from 'react-router-dom';

import logo from '../../assets/grubber_logo.svg';

const Header = ({ navigations }) => (
    <Navbar collapseOnSelect className="header" bg="light" expand="lg">
        <Navbar.Brand className="logo-container" href="/">
            <img src={logo} className="logo" alt="Grubber is the future."/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto options">
                {navigations.map((item, id) => 
                    <NavLink 
                        key={id}
                        className="option"
                        activeStyle={{
                            color: "#DBA74C"
                        }}
                        exact={item.exact}
                        to={item.link}>{item.text}</NavLink>
                )}
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)

export default Header;