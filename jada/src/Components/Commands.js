import React, {useState} from 'react';
import {axiosWithAuth} from '../utilities/axiosWithAuth'

const Commands = (props) => {
    const [command, setCommand] = useState()
    console.log(command)

    const handleChanges = e => {
        setCommand(e.target.value)
    }

    return (
        <div className='commands-container'>
            <h1> Hello from Commands</h1>
            <form onSubmit={(e) => {
                props.charAction(e,command, setCommand)}}>
                <input onChange={handleChanges} type="text" value={command}/>
            </form>
        </div>
    );
};

export default Commands;