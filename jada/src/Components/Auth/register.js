import React, { useState } from 'react';
import axios from 'axios'

const Register = (props) => {

    const [user, setUser] = useState({
        username: '',
        password1: '',
        password2: ''
    })

    const handleChanges = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value    
        })
    }

    const signup = e => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API_HOST}api/registration/`, user)
            .then(res => {
                localStorage.setItem('token', res.data.key)
                props.history.push('/dashboard')
            })
            .catch(err => {
                console.log(err)
            })
        setUser({
            username: '',
            password1: '',
            password2: ''
        })
    }


    return (
        <div className="register">
            <form onSubmit={signup}>
                <h2>Register</h2>
                <input type='text' value={user.username} name='username' onChange={handleChanges} placeholder='username' />
                <input type='password' value={user.password1} name='password1' onChange={handleChanges} placeholder='password1'/>
                <input type='password' value={user.password2} name='password2' onChange={handleChanges} placeholder='password2'/>
                <button>Register</button>
            </form>
        </div>
    );
};

export default Register;