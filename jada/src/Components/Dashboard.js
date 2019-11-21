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

    
    const charAction = (e, command, setCommand) => {
        e.preventDefault()
        console.log("Char Action")
        axiosWithAuth()
        .post("/api/adv/move", { "direction": command })
        .then(res => {
            const newRoom = res.data.id
            if(data && currentRoom) {
                data.nodes[currentRoom - 1].color = "#7a0e80"
                setCurrentRoom(newRoom)
            }
        })
        .catch(err => {
            console.error(err)
        }) 
        setCommand('')
    }

    useEffect(() => {
        console.log("Current Room has changne")
    },[currentRoom])

    return (
        <div className='container'>
            <Commands 
                charAction={charAction}
                data={data}
                setCurrentRoom={setCurrentRoom}
            />
            <div className='sidebar'>
                <Map
                    data={data} 
                    setData={setData}
                    setCurrentRoom={setCurrentRoom}
                    currentRoom={currentRoom}
                    // setPrevRoom={setPrevRoom}
                    // prevRoom={prevRoom}
                />
                <Description />
            </div>
        </div>
    );
};

export default Dashboard;