import React, {useState, useEffect} from 'react';
import {axiosWithAuth} from '../utilities/axiosWithAuth'

//components
import Map from './Map'
import Commands from './Commands'
import Description from './Description'

const Dashboard = (props) => {
    const [data, setData] = useState();
    const [currentRoom, setCurrentRoom] = useState()
    // const [prevRoom, setPrevRoom] = useState()

    const placeCommands = (dataSet) => {
        // console.log({"DATASET":dataSet});
        let textArea = document.querySelector('.command-output');
        let cmdStr = textArea.innerHTML;
        if(dataSet.title) {
            cmdStr += `<h3>${dataSet.title}</h3><p>${dataSet.description}</p>`;
        }
        textArea.innerHTML = cmdStr;
    }

    const giveDirection = (direction) => {
        console.log(direction);
        const dir = { "n":"north", "e":"east", "s":"south", "w":"west"}
        let textArea = document.querySelector('.command-output');
        let cmdStr = textArea.innerHTML;
        cmdStr += `<p class="direction">You head ${dir[direction]}</p>`;
        textArea.innerHTML = cmdStr;
    }

    
    const charAction = (e, command) => {
        e.preventDefault()
        giveDirection(command);
        console.log("Char Action")
        axiosWithAuth()
        .post("/api/adv/move", { "direction": command })
        .then(res => {
            placeCommands(res.data);
            const newRoom = res.data.id
            if(data && currentRoom) {
                data.nodes[currentRoom - 1].color = "#ba92cc"
                setCurrentRoom(newRoom)
            }
        })
        .catch(err => {
            console.error(err)
        }) 
    }

    useEffect(() => {
        console.log("Current Room has changne")
    },[currentRoom])

    return (
        <div className='container'>
            <div className='commands-container'>
                <Commands 
                    charAction={charAction}
                    data={data}
                    setCurrentRoom={setCurrentRoom}
                />
            </div>
            <div className='sidebar'>
                <Map
                    data={data} 
                    setData={setData}
                    setCurrentRoom={setCurrentRoom}
                    currentRoom={currentRoom}
                    charAction={charAction}
                    placeCommands={placeCommands}
                    // setPrevRoom={setPrevRoom}
                    // prevRoom={prevRoom}
                />
                <Description />
            </div>
        </div>
    );
};

export default Dashboard;