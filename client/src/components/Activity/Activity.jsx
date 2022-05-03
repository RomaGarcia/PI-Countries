import React, {useEffect, useRef, useState} from 'react';
import { getCountries, setActivity} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import s from './Activity.module.css';

function validate(form) {
    let errors = {};
    if (!form.name) {
      errors.name = 'El nombre de la actividad es requerido';
    } else if (!/^[A-Z]+$/i.test(form.name)) {
      errors.name = 'El nombre de la actividad no es valido';
    } else if (form.name.length < 3) errors.name = 'El nombre de la actividad debe tener un minimo de 3 caracteres';

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
    return errors;
  };

export default function Activity() {

    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);
    const activities = useSelector((state) => state.activities);
    let add = true;
    let exist = false;

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
            //...activityCountry,
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
                exist = true;
            }
        }
        
        if(exist){
            for(let i=0 ; i<activityCountry.length ; i++){
                if(activityCountry[i] === country.current.value) add = false;
            }
            if(add){
                setAvtivityCountry([
                    ...activityCountry, 
                    country.current.value
                ]);
    
                setError({
                    ...activityCountry,
                })
    
                country.current.value = '';
                return;
            }else{
                setError({
                    ...activityCountry,
                    activityCountry : 'El pais ya se ingreso'
                })
                return;
            }
        }else{
            setError({
                ...activityCountry,
                activityCountry : 'El pais ingresado no existe'
            })
        }
    }

    const handleButtonClick = function(e){
        e.preventDefault();
        setAvtivityCountry(activityCountry.filter(ac => ac !== e.target.value))
    }

    const handleFormCancel = function(e) {
        e.preventDefault();
        setForm({
            name:'',
            dificulty:0,
            duration:0,
            season:'',
        });
        setAvtivityCountry([]);
        country.current.value = '';
        setError({});
        setErrors({});
        activities.msg = '';
    }


    const handleFormSubmit = function(e) {
        e.preventDefault();
        if(form.name && !errors.name && form.dificulty && !errors.dificulty && form.duration && !errors.duration &&
            form.season && !errors.season && activityCountry.length && !error.activityCountry){
                form.duration = Number(form.duration);
                dispatch(setActivity(form,activityCountry));
                setForm({
                    name:'',
                    dificulty:0,
                    duration:0,
                    season:'',
                });
                setAvtivityCountry([]);
                country.current.value = '';
        }else alert('The form isn t complete or have errors');
    }

    return (
        <>
        <Link to='/home'><button className={s.btnBack}>Volver</button></Link>
            
            <form onSubmit={handleFormSubmit}>
            <div className={s.containerForm}> 
                <div className={s.columA}>
                    <div className={s.name}>
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" id='name' name='name' value={form.name} onChange={handleFormChange} placeholder='Ej: Senderismo'/>
                        {errors.name && (
                            <p style={{color: "red"}}>{errors.name}</p>
                        )}
                    </div>

                    <div className={s.dificulty}>
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
                    </div>

                    <div className={s.duration}>
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
                    </div>

                    <div className={s.season}>
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
                    </div>
                </div>

                <div className={s.columB}>
                <div className={s.country}>
                <label htmlFor="countrys">Pais:</label>
                <input list="country" ref={country} placeholder='Ej: ARG'/>  
                <datalist id="country">
                    {countries?.map(cn => (
                        <option key={cn.id} value={cn.id} name={cn.name}>{cn.name}</option> 
                    ))}
                </datalist>
                <button className={s.btnC} type="button" onClick={handleCountryClick}>Agregar</button>
                {console.log(activityCountry)}
                {error.activityCountry && (
                    <p style={{color: "red"}}>{error.activityCountry}</p>
                )}
                <div className={s.containerCard}>
                {activityCountry?.map(ac => (
                    <div key={ac} className={s.targetCard}>
                        <input className={s.noselect} type='button' onClick={handleButtonClick} value={ac}/>
                            <span>
                            <svg  width="24" height="24" viewBox="0 0 24 24">
                                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                            </svg>
                            </span>
                    </div>
                ))}
                </div>
                </div>
                </div>

                </div>
                <div className={s.btn}>
                    <button className={s.btnCan} onClick={handleFormCancel}>Cancelar</button>
                    <button type="submit">Crear</button>
                </div>
                
            </form> 
        
        <div className={s.msgForm}>{activities?.msg && activities?.color === 'green' && <h3 style={{color: '#16c774'}}>{activities.msg}</h3>}</div>
        <div className={s.msgForm}>{activities?.msg && activities?.color === 'red' && <h3 style={{color: '#b61913'}}>{activities.msg}</h3>}</div>
        </>
    )
}