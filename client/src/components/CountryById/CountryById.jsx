import React, {useEffect,useState} from 'react'
import { getCountrieById, addActivity} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ActivityCard from '../ActivityCard/ActivityCard';
import { Link } from 'react-router-dom';
import s from './CountryById.module.css';

export default function CountrieById(){
    const dispatch = useDispatch();
    const countrieById = useSelector((state) => state.countrieById);
    const deleteActCounMsg = useSelector((state) => state.deleteActCounMsg);
    const addActCounMsg = useSelector((state) => state.addActCounMsg);
    const activitiesAll = useSelector((state) => state.activitiesAll);
    const [activity, setActivity] = useState(1);

    //let act = 0;

    const {id} = useParams();

    useEffect(()=>{
        dispatch(getCountrieById(id))
    },[id, dispatch, deleteActCounMsg,addActCounMsg])

    //if(countrieById.activities !== undefined ) act = countrieById.activities.length

    return (
        <>

        <Link to={'/home'}><button className={s.btn}>Volver</button></Link>

        {countrieById.id !== id ? <svg className={s.load} viewBox="25 25 50 50"><circle r="20" cy="50" cx="50"></circle></svg> : 
        <div>
            <div key={countrieById.id} className={s.containerById}>
                <img src={countrieById.image} alt={countrieById.name}/>
                <div className={s.columA}>
                    <h4> <b>Pais:</b> {countrieById.name}</h4>
                    <h4> <b>Capital:</b> {countrieById.capital}</h4>
                    <h4> <b>Continente:</b> {countrieById.continent}</h4>
                    <h4> <b>SubRegion:</b> {countrieById.subregion}</h4>
                </div>
                <div className={s.columB}>
                    <h4> <b>Codigo:</b> {countrieById.id}</h4>
                    <h4> <b>Area:</b> {countrieById.area}</h4>
                    <h4> <b>Poblacion:</b> {countrieById.population}</h4>
                </div>

            </div>
            {<div className={s.contentSelect}>
                <select name="" id="filt_activity" value={activity} onChange={(e)=>setActivity(e.target.value)}>
                    {!activitiesAll.length && <option>Sin Actividad</option>} 
                    {activitiesAll?.map(ac => (
                        <option key={ac.id} value={ac.id}>{ac.name}</option> 
                    ))}
                </select>
                <button disabled={!activitiesAll.length} className={s.btnAdd} onClick={()=>dispatch(addActivity(id,activity))}>Agregar</button>
            </div>}

            {countrieById?.activities?.length !==0 && <h3 className={s.titleAct}>ACTIVIDADES</h3>}
            {countrieById?.activities?.length === 0  ? <h3 className={s.titleAct}>No hay Actividades</h3> :
            <div className={s.containerActivity}>
                {countrieById?.activities?.map(a => (
                    <div key={a.id}>
                        <ActivityCard idCountry={countrieById.id} idActivity={a.id} name={a.name} dificulty={a.dificulty} duration={a.duration} season={a.season}/>
                    </div>
                ))}
            </div>
            }
        </div>}
        </>
    )
}