import React, {useState} from 'react';
import Favicon from '../img/jada-icon.png';

const Commands = (props) => {
    const [command, setCommand] = useState()
    // console.log(command)

    const handleChanges = e => {
        setCommand(e.target.value)
    }

    return (
        <>
            <div className="text-area command-output">
                <h2><img src={Favicon} alt="JADA logo" width="32" height="32" /> JAD&#0193;</h2>
                <p className="intro">
                    Welcome! We hope you enjoy your stay here at JAD&#0193;. You
                    can <em>move</em> by <strong>entering text</strong> into the field
                    below or by <em>clicking</em> the <strong>cardinal direction buttons</strong> below the map.
                </p>
                <p className="intro">
                    The map can be <em>moved</em> by <strong>clicking and dragging</strong> on it. You can
                    also <em>zoom in and out</em> with your mouse's <strong>scroll wheel</strong>.
                </p>
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