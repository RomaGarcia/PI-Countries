const {Country} = require('../db');
const axios = require('axios');

const loaderDb = async () => {
  try {
    //const response = await fetch('https://restcountries.com/v3/all');
    //const all_countries = await response.json();
    const response = await axios.get('https://restcountries.com/v3/all');
    const all_countries = await response.data;
    let countries_to_db = [];

    if(all_countries.length)
    {
      for(let i=0 ; i<all_countries.length ; i++){
        countries_to_db.push({
          id: all_countries[i].cca3,
          name: all_countries[i].name.common,
          image: all_countries[i].flags[1],
          continent: all_countries[i].continents[0],
          capital: all_countries[i].capital ? all_countries[i].capital[0] : 'Capital not found',
          subregion: all_countries[i].subregion ? all_countries[i].subregion : 'SubRegion not found',
          area: all_countries[i].area,
          population: all_countries[i].population
        })
      }

      await Promise.all(countries_to_db.map(a=>{
        Country.findOrCreate({
          where:{ id: a.id},
          defaults: a
        })
      }))
      
      console.log('Countries loaded');

    }else console.log('Can not load the countries');
  }
  catch (error) {
    console.log(error);
  }
}



/*const loaderDb = () => {

  //return fetch('https://restcountries.com/v3/all')
    //.then(request => request.json())
    //.then(json => {})        
  

  return axios.get('https://restcountries.com/v3/all')
    .then((response)=>{
      const all_countries = response.data;

      if(all_countries.length)
      {
        let countries_to_db = [];
        for(let i=0 ; i<all_countries.length ; i++){
          countries_to_db.push({
            id: all_countries[i].cca3,
            name: all_countries[i].name.common,
            image: all_countries[i].flags[1],
            continent: all_countries[i].continents[0],
            capital: all_countries[i].capital ? all_countries[i].capital[0] : 'Capital not found',
            subregion: all_countries[i].subregion ? all_countries[i].subregion : 'SubRegion not found',
            area: all_countries[i].area,
            population: all_countries[i].population
          })
        }

        Promise.all(countries_to_db.map(a=>{
          Country.findOrCreate({
            where:{ id: a.id},
            defaults: a
          })
        }))
        
      }else console.log('Can not load the countries');
    })
    .then(()=>{console.log('Countries loaded');})
    
  .catch ((error) => console.log(error))
}*/

module.exports = loaderDb;