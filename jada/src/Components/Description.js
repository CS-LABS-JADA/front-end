import React from 'react';

const Description = () => {
    return (
        <div className='desc-cont'>
            <h3>Player Commands</h3>
            <ul>
                <li class="title">Directions</li>
                <li><strong>n</strong> : north</li>
                <li><strong>e</strong> : east</li>
                <li><strong>s</strong> : south</li>
                <li><strong>w</strong> : west</li>
            </ul>
        </div>
    );
};

export default Description;