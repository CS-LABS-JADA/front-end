import React from 'react';
import { Graph } from "react-d3-graph";

const Map = () => {

  Graph._zoomed = undefined; 
  Graph._onDragEnd = undefined; 

//   const onClickGraph = function(e) {
//     // e.preventDefault()
//     console.log('Clicked the graph background', e);
// };

  const onClickNode = (nodeId) => {
    window.alert(`Clicked node ${nodeId}`);
  };

  const data = {
    nodes: [
      {id:'1', x: 0, y: 0,},
      {id:'2', x: 0, y: 20, color: '#d3d3d3'},
      {id:'3', x: -30, y: -30},
      {id:'4', x: 50, y: 50},
      {id:'5', x: 70, y: 70},
  ],
    links: [
      {source:'1', target:'2'},
      {source:'1', target:'3'},
      {source:'2', target:'5'},
      {source:'4', target:'5'},
      {source:'3', target:'4'},
    ]
  }

  const myConfig = {
    staticGraph: true,
    panAndZoom: true,
    enableFocusAnimation: false,
    nodeHighlightBehavior: true,
    node: {
        color: "lightgreen",
        size: 120,
        highlightStrokeColor: "blue",
    },
    link: {
        highlightColor: "lightblue",
    },
  };



    return (
      <div className='map-container'>
        <h1> Hello from Map</h1>
          <div className='map-box'>
            <Graph 
              id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
              data={data}
              config={myConfig}
              // onClickGraph={onClickGraph}
              // draggable={false}
              onClickNode={onClickNode}
            />
          </div>
      </div>
    );
};

export default Map;