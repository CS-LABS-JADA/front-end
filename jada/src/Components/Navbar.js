import React from 'react';
import { NavLink } from 'react-router-dom';
import { axiosWithAuth } from '../utilities/axiosWithAuth'

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
                    <NavLink onClick={logoutJada} to="/">logout</NavLink>
                )
            }
        </div>
    );
};

export default Navbar;