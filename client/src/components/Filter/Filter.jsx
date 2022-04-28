import React, {useEffect,useState} from 'react';
import CountryCard from '../CountryCard/CountryCard';
import { useDispatch, useSelector } from 'react-redux';
import { getCountrieByName, getCountriesActivities} from '../../redux/actions';

export default function Filter({ nameSearch, continentSearch, activitySearch, alfaSearch, popuSearch}) {

    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);
    const countrieByName = useSelector((state) => state.countrieByName);
    const countriesActivity = useSelector((state) => state.countriesActivity);
    let countries_filters = [];
    let countries_filters2 = [];
    let filters = [];
    let maxPage = 0;
    const [page,setPage] = useState(1);

    useEffect(()=>{
        dispatch(getCountriesActivities());
    },[dispatch])

    useEffect(()=>{
        dispatch(getCountrieByName(nameSearch));
    },[dispatch,nameSearch])


    if( activitySearch !== 'Todas' && continentSearch !== 'Todos'){
        filters = [];
        for(let i=0 ; i<countriesActivity.length ; i++){
            for(let j=0 ; j<countriesActivity[i].activities.length ; j++){
                if(countriesActivity[i].continent === continentSearch){
                    if(countriesActivity[i].activities[j].id === Number(activitySearch)){
                        countries_filters.push(countriesActivity[i]);
                    }
                }
            }
        }
        if(!countries_filters.length) filters = [{msg:'nada'}];
    }

    if( continentSearch !== 'Todos' && activitySearch === 'Todas' ){
        for(let i=0 ; i<countriesActivity.length ; i++){
            if(countriesActivity[i].continent === continentSearch){
                countries_filters.push(countriesActivity[i]);
            } 
        }
    }

    if( continentSearch === 'Todos' && activitySearch !== 'Todas' ){
        for(let i=0 ; i<countriesActivity.length ; i++){
            for(let j=0 ; j<countriesActivity[i].activities.length ; j++){
                if(countriesActivity[i].activities[j].id === Number(activitySearch)){
                    countries_filters.push(countriesActivity[i]);
                }
            }
        }

    }

    if(alfaSearch === 'DESC' && popuSearch === 'indisPopu' && !filters.length){
        function SortArray(x, y){
            if (x.name < y.name) {return -1;}
            if (x.name > y.name) {return 1;}
            return 0;
        }
        
        //console.log('a',countries_filters)
        if(!countries_filters.length) countries_filters = countriesActivity //ESTE IF CON LA ASIGNACION LO HAGO PORQUE CUANDO TIENE CONDICION DE TODOS-TODAS-INDSALF-INDSPOP -> countries_filters esta vacio 
        countries_filters = countries_filters.sort(SortArray);
        //console.log('b',countries_filters)
    }

    if(alfaSearch === 'ASC' && popuSearch === 'indisPopu' && !filters.length){
        function SortArray(x, y){
            if (x.name < y.name) {return 1;}
            if (x.name > y.name) {return -1;}
            return 0;
        }
        //countries_filters = countriesActivity.sort(SortArray);
        if(!countries_filters.length) countries_filters = countriesActivity
        countries_filters = countries_filters.sort(SortArray);
    }

    if(alfaSearch === 'indisAlfa' && popuSearch === 'DESC' && !filters.length){
        function SortArray(x, y){
            if (x.population < y.population) {return 1;}
            if (x.population > y.population) {return -1;}
            return 0;
        }
        //countries_filters = countriesActivity.sort(SortArray);
        if(!countries_filters.length) countries_filters = countriesActivity
        countries_filters = countries_filters.sort(SortArray);
    }

    if(alfaSearch === 'indisAlfa' && popuSearch === 'ASC' && !filters.length){
        function SortArray(x, y){
            if (x.population < y.population) {return -1;}
            if (x.population > y.population) {return 1;}
            return 0;
        }
        //countries_filters = countriesActivity.sort(SortArray);
        if(!countries_filters.length) countries_filters = countriesActivity
        countries_filters = countries_filters.sort(SortArray);
    }

    if( nameSearch !== '' ){
        countries_filters = countrieByName;
    }
    
    if( nameSearch === '' &&  continentSearch === 'Todos' && activitySearch === 'Todas' && alfaSearch === 'indisAlfa' && popuSearch === 'indisPopu') countries_filters = countries;


    for (let i = (page * 10) - 10; i < page*10; i++) {
        if(countries_filters[i] !== undefined)
        countries_filters2.push(countries_filters[i])
    }
    maxPage = Math.ceil((countries_filters.length / 10));
    if(!maxPage) maxPage=1;

    return (
        <div>
            {!nameSearch && countries_filters2?.map(cn => (
                    <div key={cn.id}>
                        <CountryCard id={cn.id} image={cn.image} name={cn.name} continent={cn.continent}/>
                    </div>
                ))}

            {!nameSearch && filters[0] ?  (<h2>No se encontroasasd</h2>) :
            nameSearch && countries_filters2?.msg ? (<h2>No se encontro</h2>) :
            nameSearch && countries_filters2?.map(cn => (
                <div key={cn.id}>
                    <CountryCard id={cn.id} image={cn.image} name={cn.name} continent={cn.continent}/>
                </div>
            ))}
                
                {maxPage === 1 ? page :
                page > 1 && page < maxPage ?
                    <div>
                        <button onClick={()=>setPage(page-1)}>Prev</button>
                        {page}
                        <button onClick={()=>setPage(page+1)}>Next</button>
                    </div>
                :
                page <= 1 ?
                    <div>
                        {page}
                        <button onClick={()=>setPage(page+1)}>Next</button>
                    </div>
                :
                page >= maxPage &&
                    <div>
                        <button onClick={()=>setPage(page-1)}>Prev</button>
                        {page}
                    </div>
                }
        </div>
    )
}