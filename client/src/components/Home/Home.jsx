import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import CountryCard from '../CountryCard/CountryCard';
import Filter from '../Filter/Filter';
import { getCountries, getActivities} from '../../redux/actions';
import s from './Home.module.css';

export default function Home() {

    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);
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
  
    const handleInputChange = function(e) {
        setName(e.target.value);
        setContinent('Todos');
        setActivity('Todas');
        setAlfa('indisAlfa');
        setPopulation('indisPopu');
   }

    return (
        <div>
            <div className={s.options}>
                <Link to='/' ><button className={s.buttonInicio}>Inicio</button></Link>
                <Link to='/activity'><button className={s.buttonActivity}>Crear Actividad</button></Link>
            </div>
            

            <div>
                <div className={s.inputSearch}>
                    <input type="text" id='search_name'  name='name' onChange={handleInputChange} placeholder='Busca un Pais'/>
                </div>
                

                
                <div className={s.filterOptions}>
                    <div className={s.contentSelect}>
                    <select name="" id="filt_continent" value={continent} onChange={(e)=>setContinent(e.target.value)}>
                        <option value="Todos">Continentes</option>
                        <option value="South America">Sur America</option>
                        <option value="North America">Norte America</option>
                        <option value="Asia">Asia</option>
                        <option value="Africa">Africa</option>
                        <option value="Europe">Europa</option>
                        <option value="Oceania">Oceania</option>
                        <option value="Antarctica">Antartida</option>
                    </select>
                    </div>
                    
                    <div className={s.contentSelect}>
                    <select name="" id="filt_activity" value={activity} onChange={(e)=>setActivity(e.target.value)}>
                        <option value="Todas">Sin Actividad</option>
                        {activitiesAll?.map(ac => (
                            <option key={ac.id} value={ac.id}>{ac.name}</option> 
                        ))}
                    </select>
                    </div>

                    <div className={s.contentSelect}>
                    <select name="" id="search_by_alfa" value={alfa} onChange={(e)=>{setAlfa(e.target.value); setPopulation('indisPopu')}}>
                        <option value="indisAlfa">Alfabeto</option>
                        <option value="DESC">A-Z</option>
                        <option value="ASC">Z-A</option>
                    </select>
                    </div>

                    <div className={s.contentSelect}>
                    <select name="" id="search_by_population" value={population} onChange={(e)=>{setPopulation(e.target.value); setAlfa('indisAlfa')}}>
                        <option value="indisPopu">Poblacion</option>
                        <option value="DESC">Mayor-Menor</option>
                        <option value="ASC">Menor-Mayor</option>
                    </select>
                    </div>
                </div>

            </div>

            <>
                {countries && <Filter nameSearch={name} continentSearch={continent} activitySearch={activity} alfaSearch={alfa} popuSearch={population}/>}
            </>
        </div>
    )
}