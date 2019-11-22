import React from 'react';
import { NavLink } from 'react-router-dom';

import Favicon from '../img/jada-icon.png';

const Navbar = (props) => {

    const logoutJada = () => {
        localStorage.removeItem('token')

        // Logout Endpoint Still needs Work !!
        // axiosWithAuth().post(`api/login/`)
        //     .then(res => {
        //         console.log(res)
        //     })
        //     .catch(err => {
        //         console.error(err)
        //     })
    }

    return (
        <div className="navigation">
            <h2><img src={Favicon} width="32" height="32" /> JAD&#0193;</h2>
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
                    <NavLink onClick={logoutJada} to="/">logout</NavLink>
                )
            }
        </div>
    );
};

export default Navbar;