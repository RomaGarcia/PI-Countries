import React, {useEffect, useState} from 'react';
import { getCountries, setActivity, setActivityMsg} from '../../redux/actions';
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

    if(form.countries.length === 0){
        errors.countries = 'Es obligatorio por lo menos 1 pais';
    }

    return errors;
  };

export default function Activity() {

    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);
    const activities = useSelector((state) => state.activities);

    const [form,setForm] = useState({
        name:'',
        dificulty:0,
        duration:0,
        season:'',
        countries: []
    })

    const [errors, setErrors] = useState({});


    useEffect(()=>{
        dispatch(getCountries())
    },[dispatch])

    const handleFormChange = function(e) {
        setErrors(validate({
            ...form,
            [e.target.name]: e.target.value
          }));

          if(e.target.name === 'countries'){
            if(!form.countries.includes(e.target.value)){
                let arr = []
                arr = countries.filter(c => c.id === e.target.value)
                if(arr.length){
                    setForm({
                        ...form,
                        [e.target.name]: [...form.countries,e.target.value]
                    })
                }
            }
          }else{
            setForm({ 
                ...form, 
                [e.target.name]: e.target.value
            });
        }
        dispatch(setActivityMsg());
    }

   

    const handleButtonClick = function(e,c){
        e.preventDefault();
        let arr = form.countries.filter(filt => filt !== c)
        setForm({
            ...form,
            countries: arr
        })
        setErrors(validate({
            ...form,
            countries: arr
        }))
    }

    const handleFormCancel = function(e) {
        e.preventDefault();
        setForm({
            name:'',
            dificulty:0,
            duration:0,
            season:'',
            countries: []
        });

        setErrors({});
        dispatch(setActivityMsg());
    }


    const handleFormSubmit = function(e) {
        e.preventDefault();
        if(form.name && !errors.name && form.dificulty && !errors.dificulty && form.duration && !errors.duration &&
            form.season && !errors.season && form.countries.length && !errors.countries){
                form.duration = Number(form.duration);
                dispatch(setActivity(form));
                setForm({
                    name:'',
                    dificulty:0,
                    duration:0,
                    season:'',
                    countries: []
                });
                setErrors({});
        }else alert('The form isn t complete or have errors');
    }

    return (
        <div className={s.image}>
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
                        <label htmlFor="countries">Pais:</label>
                        <select name="countries" id="countries" value={''} onChange={handleFormChange}>
                            <option value=''>Seleccione un pais</option>
                            { countries?.map(c => (
                                <option key={c.id} value={c.id}>{c.name} ({c.id})</option> 
                            ))}
                        </select>
                        {errors.countries && (
                            <p style={{color: "red"}}>{errors.countries}</p>
                        )}
                        {/*<button className={s.btnC} type="button" onClick={handleFormChange}>Agregar</button>*/}

                        {console.log(form.countries)}
                        <div className={s.containerCard}>
                        {form.countries?.map(c => (//
                            <div key={c} className={s.targetCard}>
                                <button className={s.noselect} onClick={e=>handleButtonClick(e,c)}>
                                    <span className={s.text}>{c}</span>
                                    <span className={s.icon}>
                                        <svg width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666
                                                    8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z">
                                            </path>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.btn}>
                <button className={s.btnCan} onClick={handleFormCancel}>Cancelar</button>
                <button type="submit" disabled={errors.name || errors.dificulty || errors.duration || errors.season || errors.countries || 
                                      form.name === '' || form.dificulty === 0 || form.duration === 0 || form.season === '' || form.countries.length === 0}>Crear</button>
            </div>
        </form> 
        
        <div className={s.msgForm}>{activities?.msg && activities?.color === 'green' && <h3 style={{color: '#16c774'}}>{activities.msg}</h3>}</div>
        <div className={s.msgForm}>{activities?.msg && activities?.color === 'red' && <h3 style={{color: '#b61913'}}>{activities.msg}</h3>}</div>
        </div>
    )
}