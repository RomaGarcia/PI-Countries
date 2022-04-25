import React, {useEffect, useRef, useState} from 'react';
import { getCountries} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Activity() {

    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);

    const country = useRef(null);

    const [activityCountry,setAvtivityCountry] = useState([]);

    useEffect(()=>{
        dispatch(getCountries())
    },[dispatch])

    return (
        <div>
            <form >
                <label htmlFor="name">Nombre:</label>
                <input type="text" id='name'/>

                <label htmlFor="dificulty">Dificultad:</label>
                <select name="" id="dificulty">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <label htmlFor="duration">Duracion:</label>
                <select name="" id="duration">
                    <option value="1">1-2(hs)</option>
                    <option value="2">2-3(hs)</option>
                    <option value="3">3-4(hs)</option>
                    <option value="4">4-5(hs)</option>
                    <option value="5">Mayor a 5(hs)</option>
                </select>

                <label htmlFor="season">Temporada:</label>
                <select name="" id="season">
                    <option value="Verano">Verano</option>
                    <option value="Invierno">Invierno</option>
                    <option value="Otoño">Otoño</option>
                    <option value="Primavera">Primavera</option>
                </select>

                <label htmlFor="countrys">Pais:</label>
                <input list="country" name="country" ref={country}/>  
                <datalist id="country">
                    {countries?.map(cn => (
                        <option key={cn.id} value={cn.id}>{cn.name}</option> 
                    ))}
                </datalist>
                <input type="button" value='Agregar' onClick={()=>setAvtivityCountry([...activityCountry,country.current.value])}/>
                {console.log(activityCountry)}

                <Link to='/home' >Home</Link>
            </form> 

        </div>
    )
}