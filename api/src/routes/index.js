const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Activity,Country, Op} = require('../db');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries', async (req,res,next)=>{
    try {
        const {name} = req.query;
        
        if(name && name !== ''){
            const county = await Country.findAll({
                where:{ name:{[Op.iLike]: `%${name}%`}}
            })
    
            county.length ? res.send(county) : res.status(404).send({msg:'Country not found'});
        }else{
            const countrieAll = await Country.findAll();
            countrieAll.length ? res.send(countrieAll) : res.status(404).send('Countries not founds');
        }

    } catch (error) {
        next(error);
    }
})

/*router.get('/countries', (req,res,next)=>{
    const {name} = req.query;
    if(name && name !== ''){
        Country.findAll({
            where:{ name:{[Op.iLike]: `%${name}%`}}
        })
        .then((country)=>{
            if(country.length) return res.send(country)
            else return res.status(404).send({msg:'Country not found'});
        })
        .catch(error => next(error))

    }else{
        Country.findAll()
        .then((countries)=>{
            if(countries.length) return res.send(countries)
            else return res.status(404).send({msg:'Countries not found'});
        })
        .catch(error => next(error))
    }

})*/

router.get('/countries/activity', async (req,res,next)=>{
    try {
        const pais = await Country.findAll({
            include: Activity
        });
    
        pais.length ? res.send(pais) : res.status(404).send('Don t have countries n activities');

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

        if(!activity){
            const act_created = await Activity.create({name,dificulty,duration,season});
                    
            country.map(async cn => {
                country_prom = await Country.findByPk(cn)
                if(country_prom instanceof Country) {
                    await act_created.addCountry(country_prom);
                    console.log('activity added to a country');
                }
                else {console.log('Country dosen t exist')}     
            })
            return res.send({msg:'Activity added',color:'green'});

        }else return res.status(404).send({msg:'Activity alredy exist',color:'red'});

    } catch (error) {
        next(error);
    }
})

router.get('/activity', async (req,res,next)=>{
    try {
        const activityAll = await Activity.findAll();
        activityAll.length ? res.send(activityAll) : res.status(404).send('do not have activities');
    } catch (error) {
        next(error);
    }
})

module.exports = router;
