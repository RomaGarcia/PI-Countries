import React from 'react';
import { Link } from 'react-router-dom';
import s from './CountryCard.module.css';

export default function CountryCard({id,image,name,continent}) {
    return (
        <div className={s.card}>
            <div className={s.cardImage}>
                <Link to={`/countrie/${id}`}><img  src={image} alt={name}/></Link>
            </div>
            <div className={s.cardText}>
                <h3>{name}</h3>
                <p> <b>Continente:</b> {continent}</p>
            </div>
        </div>
    )
}