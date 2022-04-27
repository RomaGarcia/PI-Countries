import React, {useEffect, useRef, useState} from 'react';
import { getCountries, setActivity} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export function validate(form,activityCountry) {
    let errors = {};
    if (!form.name) {
      errors.name = 'El nombre de la actividad es requerido';
    } else if (!/^[A-Z]+$/i.test(form.name)) {
      errors.name = 'El nombre de la actividad no es valido';
    }

    if (!form.dificulty) {
        errors.dificulty = 'La dificultad de la actividad es requerida';
      } else if (!/^[1-5]+$/.test(form.dificulty)) {
        errors.dificulty = 'La dificultad de la actividad no es valida';
    }
    
    if (!form.duration) {
        errors.duration = 'La duracion de la actividad es requerida';
      } else if (!/^[1-5]+$/.test(form.duration)) {
        errors.duration = 'La duraciuon de la actividad no es valido';
    }

    if (!form.season) {
        errors.season = 'La estacion de la actividad es requerida';
      } else if (form.season !== "Verano" && form.season !== "Invierno" && form.season !== "Otoño" && form.season !== "Primavera") {
        errors.season = 'La estacion de la actividad no es valida';
    }

    /*if (!activityCountry) {
        errors.activityCountry = 'El pais es requerido';
    }*/
  
    return errors;
  };

  export function validateCountry(activityCountry) {
    let errors = {};
    if (!activityCountry) {
        errors.activityCountry = 'El pais es requerido';
    }
  
    return errors;
  };

export default function Activity() {

    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);
    const activities = useSelector((state) => state.activities);

    const country = useRef(null);

    const [form,setForm] = useState({
        name:'',
        dificulty:0,
        duration:0,
        season:'',
    })

    const [errors, setErrors] = useState({});

    const [error, setError] = useState({});

    const [activityCountry,setAvtivityCountry] = useState([]);

    useEffect(()=>{
        dispatch(getCountries())
    },[dispatch])

    const handleFormChange = function(e) {
        setErrors(validate({
            ...form,
            ...activityCountry,
            [e.target.name]: e.target.value
          }));
      
          setForm({ //prevState
            ...form, //prevState
            [e.target.name]: e.target.value
          });
        activities.msg = '';
    }

    const handleCountryClick= function(e) {

        activities.msg = '';
        if(!country.current.value) {
            setError({
                ...activityCountry,
                activityCountry : 'El pais es requerido'
            })
            return;
        }

        console.log(country.current.value)
        for(let i=0 ; i<countries.length ; i++){
            if(countries[i].id === country.current.value){
                setAvtivityCountry([ //prevState
                    ...activityCountry, //prevState
                    country.current.value
                ]);

                setError({
                    ...activityCountry,
                })

                country.current.value = '';
            return;
            }
        }
        /*let a = countries.filter(cn=>{
            if(cn.id === country.current.value.toUpperCase()){
                setBool(true);
                return;
            }
        })
        console.log(country.current.value)*/
        setError({
            ...activityCountry,
            activityCountry : 'El pais ingresado no existe'
        })
            

        
        
        /*setAvtivityCountry([ //prevState
            ...activityCountry, //prevState
            country.current.value
            ]);

        setError({
            ...activityCountry,
        })*/
    }

    const handleFormSubmit = function(e) {
        e.preventDefault();
        if(form.name && !errors.name && form.dificulty && !errors.dificulty && form.duration && !errors.duration && form.season && !errors.season){
            form.duration = Number(form.duration);
            dispatch(setActivity(form,activityCountry));
            setForm({
                name:'',
                dificulty:0,
                duration:0,
                season:'',
            });
            setAvtivityCountry([]);
        }else console.log('Falta Completar el Formulario');
    }

    return (
        <div>
            <Link to='/home' >Home</Link>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="name">Nombre:</label>
                <input type="text" id='name' name='name' value={form.name} onChange={handleFormChange}/>
                {errors.name && (
                    <p style={{color: "red"}}>{errors.name}</p>
                )}

                <label htmlFor="dificulty">Dificultad:</label>
                <select name="dificulty" id="dificulty" value={form.dificulty} onChange={handleFormChange}>
                    <option value="0">1-5</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                {errors.dificulty && (
                    <p style={{color: "red"}}>{errors.dificulty}</p>
                )}

                <label htmlFor="duration">Duracion:</label>
                <select name="duration" id="duration" value={form.duration} onChange={handleFormChange}>
                    <option value="0">Horas</option>
                    <option value="1">1-2 (hs)</option>
                    <option value="2">2-3 (hs)</option>
                    <option value="3">3-4 (hs)</option>
                    <option value="4">4-5 (hs)</option>
                    <option value="5">Mayor 5 (hs)</option>
                </select>
                {errors.duration && (
                    <p style={{color: "red"}}>{errors.duration}</p>
                )}

                <label htmlFor="season">Temporada:</label>
                <select name="season" id="season" value={form.season} onChange={handleFormChange}>
                    <option value="">Estacion</option>
                    <option value="Verano">Verano</option>
                    <option value="Invierno">Invierno</option>
                    <option value="Otoño">Otoño</option>
                    <option value="Primavera">Primavera</option>
                </select>
                {errors.season && (
                    <p style={{color: "red"}}>{errors.season}</p>
                )}

                <label htmlFor="countrys">Pais:</label>
                <input list="country" name="country" ref={country}/>  
                <datalist id="country">
                    {countries?.map(cn => (
                        <option key={cn.id} value={cn.id}>{cn.name}</option> 
                    ))}
                </datalist>
                <input type="button" value='Agregar' onClick={handleCountryClick/*()=>setAvtivityCountry([...activityCountry,country.current.value])*/}/>
                {console.log(activityCountry)}
                {error.activityCountry && (
                    <p style={{color: "red"}}>{error.activityCountry}</p>
                )}

                <button type="submit">Enviar</button>
            </form> 

            {activities?.msg ? <h3>{activities.msg}</h3> : <h3></h3>}

        </div>
    )
}