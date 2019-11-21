import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {

    return (
        <div className="navigation">
            <h2>JAD&#0193;</h2>
            {
                localStorage.getItem("token") === null && (
                    <>
                        <NavLink exact to="/">login</NavLink>
                        <NavLink to="/register">register</NavLink>
                    </>
                )
            }
            {
                localStorage.getItem("token") && (
                    <NavLink to="/logout">logout</NavLink>
                )
            }
        </div>
    );
};

export default Navbar;