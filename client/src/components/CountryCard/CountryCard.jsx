import React from 'react';
import { Link } from 'react-router-dom';

export default function CountryCard({id,image,name,continent}) {
    return (
        <div>
            <Link to={`/countrie/${id}`}><img src={image} alt={name}/></Link>
            <h3>Pais: {name}</h3>
            <h4>Continente: {continent}</h4>
        </div>
    )
}