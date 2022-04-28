import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import CountryCard from '../CountryCard/CountryCard';
import Filter from '../Filter/Filter';
import { getCountries, getCountrieByName, getActivities } from '../../redux/actions';

export default function Home() {

    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);

    //const countrieByName = useSelector((state) => state.countrieByName);

    const activities = useSelector((state) => state.activities);

    const activitiesAll = useSelector((state) => state.activitiesAll);

    activities.msg = '';

    const [continent, setContinent] = useState('Todos');
    const [activity, setActivity] = useState('Todas');
    const [alfa, setAlfa] = useState('indisAlfa');
    const [population, setPopulation] = useState('indisPopu');

    useEffect(()=>{
        dispatch(getCountries());
        dispatch(getActivities());
    },[dispatch])

    const [name, setName] = useState('');

    /*useEffect(()=>{
        dispatch(getCountrieByName(name));
    },[dispatch,name])*/
  
    const handleInputChange = function(e) {
        setName(e.target.value);
        setContinent('Todos');
        setActivity('Todas');
        setAlfa('indisAlfa');
        setPopulation('indisPopu');
   }

   /*const handleSelectChange = (e)=>{
     e.preventDefault();
     let countriesContinents = [];
     if(e.target.value === 'SurAmerica')
     countriesContinents = countries.filter(cn => {
         if(cn.continent === 'South America') return cn;
     })
     console.log(e.target.value);
   }*/

    return (
        <div>
            <Link to='/' >Inicio</Link>

            <div>
                <label htmlFor="search_name">Nombre: </label>
                <input type="text" id='search_name'  name='name' onChange={handleInputChange}/>

                

                <label htmlFor="filt_continent">Continente: </label>
                <select name="" id="filt_continent" value={continent} onChange={(e)=>setContinent(e.target.value)}>
                    <option value="Todos">Todos</option>
                    <option value="South America">Sur America</option>
                    <option value="North America">Norte America</option>
                    <option value="Asia">Asia</option>
                    <option value="Africa">Africa</option>
                    <option value="Europe">Europa</option>
                    <option value="Antarctica">Antartida</option>
                </select>

                <label htmlFor="filt_activity">Actividad: </label>
                <select name="" id="filt_activity" value={activity} onChange={(e)=>setActivity(e.target.value)}>
                    <option value="Todas">Todas</option>
                    {activitiesAll?.map(ac => (
                        <option key={ac.id} value={ac.id}>{ac.name}</option> 
                    ))}
                </select>

                <label htmlFor="search_by_alfa">Ordenar Alfabeticamente: </label>
                <select name="" id="search_by_alfa" value={alfa} onChange={(e)=>{setAlfa(e.target.value); setPopulation('indisPopu')}}>
                    <option value="indisAlfa">-</option>
                    <option value="DESC">A-Z</option>
                    <option value="ASC">Z-A</option>
                </select>

                <label htmlFor="search_by_population">Ordenar Poblacion: </label>
                <select name="" id="search_by_population" value={population} onChange={(e)=>{setPopulation(e.target.value); setAlfa('indisAlfa')}}>
                    <option value="indisPopu">-</option>
                    <option value="DESC">Mayor</option>
                    <option value="ASC">Menor</option>
                </select>

                <Link to='/activity'>Crear Actividad</Link>
            </div>

            <div>
                {countries && <Filter nameSearch={name} continentSearch={continent} activitySearch={activity} alfaSearch={alfa} popuSearch={population}/>}
                
                {/*!name && countries?.map(cn => (
                    <div key={cn.id}>
                        <CountryCard id={cn.id} image={cn.image} name={cn.name} continent={cn.continent}/>
                    </div>
                ))*/}

                {/*name && countrieByName?.msg ? (<h2>No se encontro</h2>) :
                name && countrieByName?.map(cn => (
                    <div key={cn.id}>
                        <CountryCard id={cn.id} image={cn.image} name={cn.name} continent={cn.continent}/>
                    </div>
                ))*/}
            </div>
        </div>
    )
}