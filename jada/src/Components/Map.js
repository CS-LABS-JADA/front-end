import React, { useEffect, useState } from 'react';
import { Graph } from "react-d3-graph";
import { axiosWithAuth } from "../utilities/axiosWithAuth";

const Map = (props) => {
    // const [data, setData] = useState();
    // const [currentRoom, setCurrentRoom] = useState()
    const [prevRoom, setPrevRoom] = useState()

    const config = {
        nodeHighlightBehavior: true,
        staticGraph: true,
        node: {
            color: "rgb(120,120,120)",
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
            // console.log(data, "data")
            data.nodes[Math.floor(Math.random() * 501)].color = 'yellow'
            props.setData(data);
            // props.test(data, setCurrentRoom)
        })
        .catch((err) => {
            console.log(err)
        })

        axiosWithAuth()
        .get("api/adv/init")
        .then((res) => {
            props.placeCommands(res.data);
            props.setCurrentRoom(res.data.id)
        })
        .catch((err) => {
            console.error(err)
        })
    }, []);
    
    useEffect(() => {
        // console.log("Attempting to change color")
        if(props.data && props.currentRoom) {
            props.data.nodes[props.currentRoom - 1].color = "#a616e9"
            setPrevRoom(props.currentRoom)
        }
    }, [props.data, props.currentRoom])
    
    if(!props.data) {
        return (
            <div className='map-container loading'>
                <h4>Loading rooms...</h4>
            </div>
        )
    }

    return (
        <div className='map-container'>
            <Graph 
                style={{border: "1px solid red"}}
                id="graph-id" 
                data={props.data} 
                config={config}
                 />
            <div className="mv-btns">
                <button onClick={e => {props.charAction(e, "n")}} name="n">North</button>
                <button onClick={e => {props.charAction(e, "s")}} name="s">South</button>
                <button onClick={e => {props.charAction(e, "e")}} name="e">East</button>
                <button onClick={e => {props.charAction(e, "w")}} name="w">West</button>
            </div>
        </div>
    );
};

export default Map;