const { Router } = require('express');
const { Activity,Country, Op} = require('../db');
const router = Router();


router.post('/',async (req,res,next)=>{
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

router.get('/', async (req,res,next)=>{
    try {
        const activityAll = await Activity.findAll();
        activityAll.length ? res.send(activityAll) : res.status(404).send({msg:'do not have activities'});
    } catch (error) {
        next(error);
    }
})


router.delete('/', async (req,res,next)=>{
    try {
        const {idCountry,idActivity} = req.body;

        if(idCountry && idActivity && idCountry.toUpperCase() && Number(idActivity)){
            let country = null;
            let activity = null;
    
            country = await Country.findByPk(idCountry.toUpperCase())
            activity = await Activity.findByPk(Number(idActivity))        
            if(country && activity){
                await country.removeActivity(activity)
                return res.send({msg:'Actividad eliminada'})
            }
            else return res.status(404).send({msg:'Not found'});
        }
        else return res.status(404).send({msg:'Nothing recive'});

        /*await Country.destroy({
            where: {id: idCountry},
            include: {
                model:Activity,
                where: {id:idActivity} 
            }
            
        })
        return res.send('Actividad eliminada')*/
    } catch (error) {
        next(error);
    }
})

module.exports = router;