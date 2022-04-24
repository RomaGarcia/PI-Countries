const {Country} = require('../db');
const axios = require('axios');

const loaderDb = async () => {
    try {
        const response = await axios.get('https://restcountries.com/v3/all');
        const all_countries = await response.data;
        let countries_to_db = [];

        /*await Country.create({
                id: 'ABC',
                name: 'PRUEBA',
                image: 'ASASDADS',
                continent: 'ASDASD',
                capital: 'FGHGH',
        })*/
        for(let i=0 ; i<all_countries.length ; i++){
            if(all_countries[i].cca3 && all_countries[i].name.common && all_countries[i].flags &&
                all_countries[i].continents && all_countries[i].capital){

                    countries_to_db.push({
                            id: all_countries[i].cca3,
                            name: all_countries[i].name.common,
                            image: all_countries[i].flags[1],
                            continent: all_countries[i].continents[0],
                            capital: all_countries[i].capital[0],
                            subregion: all_countries[i].subregion,
                            area: all_countries[i].area,
                            population: all_countries[i].population
                        })
                        /*if(all_countries[i].capital){
                            console.log(all_countries[i].capital[0]);
                        }*/
                        
                
                    /*countries_to_db.push (await Country.create({
                    id: all_countries[i].fifa,
                    name: all_countries[i].name.common,
                    image: all_countries[i].flags[1],
                    continent: all_countries[i].continents[0],
                    capital: all_countries[i].capital[0],
                    subregion: all_countries[i].subregion,
                    area: all_countries[i].area,
                    population: all_countries[i].population
            }))*/
            }
        }
        countries_to_db.map(async a=>{
            await Country.findOrCreate({
                where:{ id: a.id},
                defaults: a
        })})
        //const promises_finished =  await Promise.all(promises);
        //return res.send(promises_finished);
        //return res.send(countries_to_db)
        console.log('Countries loaded');
    }
    /*try {
    const apiResponse = await axios.get('https://restcountries.com/v3/all')
    const apiCountries = apiResponse.data

    for (let i = 0; i < apiCountries.length; i++) {
      const country = apiCountries[i]
      if(country.name.common && country.fifa && country.capital &&
        country.flags[1] && country.continents){
      const addCountry = {
        name: country.name.common,
        id: country.fifa,
        subregion: country.subregion,
        image: country.flags[1],
        capital: country.capital[0],
        population: country.population,
        area: country.area,
        continent: country.continents[0]
      }


      try {
        Country.create(
            addCountry
        )

        // console.log('▄'.green, addCountry.name, 'Cargado correctamente'.green)
      } catch (err) {
        console.log('▄'.red, err)
      }
    }
    }
    console.log(`${apiCountries.length} paises cargados correctamente`.green)
  } */catch (error) {
        console.log(error);
    }
}

module.exports = loaderDb;