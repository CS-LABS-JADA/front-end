import React, {useState} from 'react';
import {axiosWithAuth} from '../utilities/axiosWithAuth'

const Commands = (props) => {
    const [command, setCommand] = useState()
    console.log(command)

    const handleChanges = e => {
        setCommand(e.target.value)
    }

    return (
        <>
            <div class="text-area command-output">
            </div>
            <form onSubmit={(e) => {
                props.charAction(e,command); 
                setCommand('')}}>
                <input onChange={handleChanges} type="text" value={command} placeholder="input commands here"/>
            </form>
        </>                    
    );
};

export default Commands;