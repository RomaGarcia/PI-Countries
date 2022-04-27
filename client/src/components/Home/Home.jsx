import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CountryCard from '../CountryCard/CountryCard';
import { getCountries, getCountrieByName, getActivities } from '../../redux/actions';

export default function Landing() {

    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);

    const countrieByName = useSelector((state) => state.countrieByName);

    const activities = useSelector((state) => state.activities);

    const activitiesAll = useSelector((state) => state.activitiesAll);

    activities.msg = '';

    useEffect(()=>{
        dispatch(getCountries());
        dispatch(getActivities());
    },[dispatch])

    const [name, setName] = useState('');

    useEffect(()=>{
        dispatch(getCountrieByName(name));
    },[dispatch,name])
  
    const handleInputChange = function(e) {
        setName(e.target.value);
   }
  /*
   const handleSubmit = (e)=>{
     e.preventDefault();
     dispatch(getCountrieByName(name))
   }*/

    return (
        <div>
            <Link to='/' >Inicio</Link>

            <div>
                <label htmlFor="search_name">Nombre: </label>
                <input type="text" id='search_name'  name='name' onChange={handleInputChange}/>

                

                <label htmlFor="filt_continent">Continente: </label>
                <select name="" id="filt_continent">
                    <option value="Todos">Todos</option>
                    <option value="SurAmerica">Sur America</option>
                    <option value="NorteAmerica">Norte America</option>
                    <option value="Asia">Asia</option>
                    <option value="Africa">Africa</option>
                    <option value="Europa">Europa</option>
                    <option value="Antartida">Antartida</option>
                </select>

                <label htmlFor="filt_activity">Actividad: </label>
                <select name="" id="filt_activity">
                    <option value="Todas">Todas</option>
                    {activitiesAll?.map(ac => (
                        <option key={ac.id} value={ac.id}>{ac.name}</option> 
                    ))}
                </select>

                <label htmlFor="search_by_alfa">Ordenar Alfabeticamente: </label>
                <select name="" id="search_by_alfa">
                    <option value="indisAlfa">-</option>
                    <option value="DESC">A-Z</option>
                    <option value="ASC">Z-A</option>
                </select>

                <label htmlFor="search_by_population">Ordenar Poblacion: </label>
                <select name="" id="search_by_population">
                    <option value="indisPob">-</option>
                    <option value="DESC">Mayor</option>
                    <option value="ASC">Menor</option>
                </select>

                <Link to='/activity' >Crear Actividad</Link>
            </div>

            <div>
                
                {!name && countries?.map(cn => (
                    <div key={cn.id}>
                        <CountryCard id={cn.id} image={cn.image} name={cn.name} continent={cn.continent}/>
                    </div>
                ))}
                {name && countrieByName?.msg ? (<h2>No se encontro</h2>) :
                name && countrieByName?.map(cn => (
                    <div key={cn.id}>
                        <CountryCard id={cn.id} image={cn.image} name={cn.name} continent={cn.continent}/>
                    </div>
                ))}
            </div>
        </div>
    )
}