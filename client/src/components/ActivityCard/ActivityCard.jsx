import React from 'react';
import s from './ActivityCard.module.css';
import { deleteActCoun} from '../../redux/actions';
import { useDispatch } from 'react-redux';

export default function ActivityCard({idCountry,idActivity,name,dificulty,duration,season}) {
    const dispatch = useDispatch()

    return (
        <div className={s.card}>
            <button className={s.btnDelete} onClick={e=>{dispatch(deleteActCoun(idCountry,idActivity))}}>X</button>
            <h3>{name}</h3>
            <h4>  <b>Dificultad:</b> {dificulty}</h4>
            <h4>  <b>Duracion:</b> {duration}</h4>
            <h4>  <b>Temporada:</b> {season}</h4>
        </div>
    )
}