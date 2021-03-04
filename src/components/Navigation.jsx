import React, { useState } from 'react';
import {Link} from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";
import {useAppContext, SET_ACCESS_TOKEN} from "../providers/ApplicationProvider";

const Navigation = props => {
    const [isOpen, setIsOpen] = useState(false);
    const [{accessToken}, dispatch] = useAppContext();
    const toggle = () => setIsOpen(!isOpen);
    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand tag={Link} to="/">Quotes</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/list">List</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/create">Create</NavLink>
                    </NavItem>
                </Nav>
                {
                    accessToken
                    ?
                    <Nav navbar>
                        <NavItem>
                            <Button onClick={e=>{dispatch({type: SET_ACCESS_TOKEN, payload: null})}}>Logout</Button>
                        </NavItem>
                    </Nav>
                    :
                    <Nav navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/register">Register</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/login">Login</NavLink>
                    </NavItem>
                </Nav>
                }
            </Collapse>
        </Navbar>
    );
}

export default Navigation;