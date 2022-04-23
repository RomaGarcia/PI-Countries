const { Router } = require('express');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Activity,Country, Op} = require('../db');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countriess', async (req,res,next)=>{
    try {
        const {name} = req.query;
        
        const county = await Country.findAll({
            where:{ name:{[Op.iLike]: `%${name}%`}}
        })

        county.length ? res.send(county) : res.status(404).send('Country not found');
    } catch (error) {
        next(error);
    }
})

router.get('/countries', async (req,res,next)=>{
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
            if(all_countries[i].fifa && all_countries[i].name.common && all_countries[i].flags &&
                all_countries[i].continents && all_countries[i].capital){

                    countries_to_db.push({
                            id: all_countries[i].fifa,
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
        return res.send(countries_to_db)
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
        next(error);
    }
})

router.get('/countries/:idPais', async (req,res,next)=>{
    try {
        const {idPais} = req.params;

        const pais = await Country.findByPk(idPais,{
            include: Activity
        });

        pais ? res.send(pais) : res.status(404).send('Country not found');
    } catch (error) {
        next(error);
    }
})

router.post('/activity',async (req,res,next)=>{
    try {
        const {name,dificulty,duration,season,country} = req.body;

        const activity = await Activity.findOne({
            where: {name,dificulty,duration,season}
        });

        if(!activity){
            const act_created = await Activity.create({name,dificulty,duration,season});
            let country_prom = await Country.findByPk(country);
            /*const promises = country.map(async cn => {
                country_prom = await Country.findByPk(cn)//name o id???? ver front*/
            
            //const country_prom = await Promise.all(promises);
            if(country_prom) {await act_created.addCountry(country_prom);
            //})
            return res.send('Activity added succefuly');}
            else res.status(404).send('Country dosen t exist');
        }else{
            return res.status(404).send('Activity alredy exist');
        }

    } catch (error) {
        next(error);
    }
})

router.get('/all', async (req,res,next)=>{
    try {
        const character = await Country.findAll({
            where:{id: 'BOT'}
        });
    return res.send(character);
    } catch (error) {
        next(error);
    }
})
module.exports = router;
