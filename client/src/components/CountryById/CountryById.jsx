import React, {useEffect} from 'react'
import { getCountrieById } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ActivityCard from '../ActivityCard/ActivityCard';
import { Link } from 'react-router-dom';

export default function CountrieById(){
    const dispatch = useDispatch();
    const countrieById = useSelector((state) => state.countrieById);

    const {id} = useParams();

    useEffect(()=>{
        dispatch(getCountrieById(id))
    },[id, dispatch])

    return (
        <div key={countrieById.id}>
            <Link to={'/home'}>Volver</Link>
            <img src={countrieById.image} alt={countrieById.name}/>
            <h3>Pais: {countrieById.name}</h3>
            <h4>Codigo: {countrieById.id}</h4>
            <h4>Capital: {countrieById.capital}</h4>
            <h4>Continente: {countrieById.continent}</h4>
            <h4>SubRegion: {countrieById.subregion}</h4>
            <h4>Area: {countrieById.area}</h4>
            <h4>Poblacion: {countrieById.population}</h4>
            {countrieById.activities && countrieById.activities.map(a => (
                <div key={a.id}>
                    <ActivityCard id={a.id} name={a.name} dificulty={a.dificulty} duration={a.duration} season={a.season}/>
                </div>
            ))}
        </div>
    )
}