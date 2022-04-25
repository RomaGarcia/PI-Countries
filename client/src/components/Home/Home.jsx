import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CountryCard from '../CountryCard/CountryCard';
import { getCountries } from '../../redux/actions';

export default function Landing() {

    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);


    useEffect(()=>{
        dispatch(getCountries())
    },[dispatch])


    return (
        <div>
            <Link to='/' >Inicio</Link>

            <div>
                <label htmlFor="search_name">Nombre: </label>
                <input type="text" id='search_name'/>

                <label htmlFor="filt_continent">Continente: </label>
                <select name="" id="filt_continent">

                </select>

                <label htmlFor="filt_activity">Actividad: </label>
                <select name="" id="filt_activity">
                    
                </select>

                <label htmlFor="search_by_alfa">Ordenar Alfabeticamente: </label>
                <select name="" id="search_by_alfa">
                    <option value="DESC">A-Z</option>
                    <option value="ASC">Z-A</option>
                </select>

                <label htmlFor="search_by_population">Ordenar Poblacion: </label>
                <select name="" id="search_by_population">
                    <option value="DESC">Mayor</option>
                    <option value="ASC">Menor</option>
                </select>

                <Link to='/activity' >Crear Actividad</Link>
            </div>

            <div>
                {countries && countries.map(cn => (
                    <div key={cn.id}>
                        <CountryCard id={cn.id} image={cn.image} name={cn.name} continent={cn.continent}/>
                    </div>
                ))}
            </div>
        </div>
    )
}