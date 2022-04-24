const { Router } = require('express');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Activity,Country, Op} = require('../db');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries', async (req,res,next)=>{
    try {
        const {name} = req.query;
        
        if(name){
            const county = await Country.findAll({
                where:{ name:{[Op.iLike]: `%${name}%`}}
            })
    
            county.length ? res.send(county) : res.status(404).send('Country not found');
        }else{
            const countrieAll = await Country.findAll();
            countrieAll.length ? res.send(countrieAll) : res.status(404).send('Countries not founds');
        } //return res.status(404).send('the value isn t a string or nothing recive');

    } catch (error) {
        next(error);
    }
})



router.get('/countries/:idPais', async (req,res,next)=>{
    try {
        const idPais = req.params.idPais.toUpperCase();

        if(idPais){
            const pais = await Country.findByPk(idPais,{
                include: Activity
            });
    
            pais ? res.send(pais) : res.status(404).send('Country not found');
        }else return res.status(404).send('Nothing recive');

    } catch (error) {
        next(error);
    }
})

router.post('/activity',async (req,res,next)=>{
    try {
        const {name,dificulty,duration,season,country} = req.body;

        if(!name || typeof name !== 'string') return res.status(404).send('The name dosen t exists or the name isn t a string');
        if(!dificulty || dificulty != 1 && dificulty != 2 && dificulty != 3 && dificulty != 4 && dificulty != 5) {
            return res.status(404).send('The dificulty dosen t exists or the dificulty isn t a available number');
        };
        if(!duration || typeof duration != 'number') return res.status(404).send('The duraction dosen t exists or isnt a number');
        if(!season || season !== "Verano" && season !== "Invierno" && season !== "Otoño" && season !== "Primavera"){
            return res.status(404).send('The season dosen t exists or the season isn t a available');
        };
        if(!country.length) return res.status(404).send('The country parameter dosen t exists');

        const activity = await Activity.findOne({
            where: {name,dificulty,duration,season}
        });
        let status;

        if(!activity){
            //si el pais no existe lo crea igual!!!!!!!!!!!!!! (se podria hacer un map del country)
            const act_created = await Activity.create({name,dificulty,duration,season});
            
            
            const promises = country.map(async cn => {
                country_prom = await Country.findByPk(cn)//name o id???? ver front
                if(country_prom instanceof Country) {
                    await act_created.addCountry(country_prom);
                
                    //return res.send('Activity added succefuly');
                    status=true;
                    console.log(status);
                    console.log('activity added');
                    
                }
                else {console.log('Country dosen t exist'); status=false}//res.status(404).send('Country dosen t exist');
            //const country_prom = await Promise.all(promises);
            
            })
            /*let country_prom = await Country.findByPk(country);
            if(country_prom) {
                await act_created.addCountry(country_prom);
            
                return res.send('Activity added succefuly');
            }
            else res.status(404).send('Country dosen t exist');*/
        }else{
            return res.status(404).send('Activity alredy exist');
        }

        /*if(status) return res.send('Activity added succefuly');
        return res.send('Some Avtivities can t be added becauese the country dosen t exists');*/
        return res.send('Activity added');

    } catch (error) {
        next(error);
    }
})

router.get('/all', async (req,res,next)=>{
    try {
        const character = await Country.findByPk("1");
        console.log(character instanceof Country);
    return res.send(character);
    } catch (error) {
        next(error);
    }
})
module.exports = router;
