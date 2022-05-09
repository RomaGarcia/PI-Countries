const { Router } = require('express');
const { Activity,Country, Op} = require('../db');
const router = Router();

router.get('/', async (req,res,next)=>{
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

/*router.get('/', (req,res,next)=>{
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

router.get('/activity', async (req,res,next)=>{
    try {
        const pais = await Country.findAll({
            include: Activity
        });
    
        pais.length ? res.send(pais) : res.status(404).send('Don t have countries n activities');

    } catch (error) {
        next(error);
    }
})

router.get('/:idPais', async (req,res,next)=>{
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

module.exports = router;