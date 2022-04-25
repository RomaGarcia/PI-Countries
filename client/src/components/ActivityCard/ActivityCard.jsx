import React from 'react';

export default function ActivityCard({id,name,dificulty,duration,season}) {
    return (
        <div> 
            <h3>Nombre: {name}</h3>
            <h4>Dificultad: {dificulty}</h4>
            <h4>duration: {duration}</h4>
            <h4>season: {season}</h4>
        </div>
    )
}