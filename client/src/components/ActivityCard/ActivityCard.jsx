import React from 'react';
import s from './ActivityCard.module.css';

export default function ActivityCard({id,name,dificulty,duration,season}) {
    return (
        <div className={s.card}> 
            <h3>{name}</h3>
            <h4>  <b>Dificultad:</b> {dificulty}</h4>
            <h4>  <b>Duracion:</b> {duration}</h4>
            <h4>  <b>Temporada:</b> {season}</h4>
        </div>
    )
}