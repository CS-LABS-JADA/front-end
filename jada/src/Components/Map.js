import React, { useEffect, useState } from 'react';
import { Graph } from "react-d3-graph";
import { axiosWithAuth } from "../utilities/axiosWithAuth";

const Map = () => {
    const [data, setData] = useState();
    const [currentRoom, setCurrentRoom] = useState()
    const [prevRoom, setPrevRoom] = useState()

    const config = {
        nodeHighlightBehavior: true,
        staticGraph: true,
        node: {
            color: "lightgrey",
            size: 120,
            highlightStrokeColor: "blue",
            renderLabel: false,
        },
        link: {
            highlightColor: "lightblue",
        },
    };

    useEffect(() => {
        axiosWithAuth()
        .get("api/adv/get_rooms")
        .then((res) => {
            const arr = []
            const data = {nodes: [], links: []}
            for (let [key, value] of Object.entries(res.data.rooms)) {
                arr.push(value)
                data.nodes.push({id: key, x: value.x * 35, y: value.y * -35})
                // data.links.push({source: key, target: value.n_to})
                if (value.s_to !== 0) {
                    data.links.push({source:key ,target: String(value.s_to)})
                }
                if (value.n_to !== 0) {
                    data.links.push({source:key ,target: String(value.n_to)})
                }
                if (value.e_to !== 0) {
                    data.links.push({source:key ,target: String(value.e_to)})
                }
                if (value.w_to !== 0) {
                    data.links.push({source:key ,target: String(value.w_to)})
                }
            } 
            console.log(data, "data")
            setData(data);
        })
        .catch((err) => {
            console.log(err)
        })

        axiosWithAuth()
        .get("api/adv/init")
        .then((res) => {
            setCurrentRoom(res.data.id)
        })
        .catch((err) => {
            console.error(err)
        })
    }, []);
    
    useEffect(() => {
        if(data) {
            data.nodes[currentRoom - 1].color = "purple"
            setPrevRoom(currentRoom)
        }
    }, [data, currentRoom])

    const setAction = () => {
        console.log('hi')
    }

    const charAction = e => {
        axiosWithAuth()
        .post("/api/adv/move", { "direction": e.target.name })
        .then(res => {
            const newRoom = res.data.id
            data.nodes[currentRoom - 1].color = "darkgrey"
            setCurrentRoom(newRoom)
        })
        .catch(err => {
            console.error(err)
        }) 
    }

    if(!data) return <h1>Loading rooms...</h1>

    return (
        <div className='map-container'>
            <h1> Hello from Map</h1>
            <Graph 
                style={{border: "1px solid red"}}
                id="graph-id" 
                data={data} 
                config={config}
                 />
            <button onClick={charAction} name="n">North</button>
            <button onClick={charAction} name="s">South</button>
            <button onClick={charAction} name="e">East</button>
            <button onClick={charAction} name="w">West</button>
            <form onSubmit={charAction}>
                <input onChange={setAction} type="text" />
            </form>
        </div>
    );
};

export default Map;