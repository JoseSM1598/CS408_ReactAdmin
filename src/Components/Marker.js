import React from 'react';
import {circle_style} from "../const/circle_style";




const markerStyle = {
    height: '50px',
    width: '50px',
    marginTop: '-50px'
}

const imgStyle = {
    height: '0%'
};


const Marker = (props) => (
    <div style = {circle_style}>
        <img style={imgStyle} src="https://res.cloudinary.com/og-tech/image/upload/s--OpSJXuvZ--/v1545236805/map-marker_hfipes.png" alt={props.title} />
        <h3>{props.title}</h3>
    </div>

);


export default Marker;