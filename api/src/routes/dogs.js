const { Router } = require ('express');
const axios = require('axios');
const { Dog, Temperament } = require('../db');
const { Sequelize } = require('sequelize');
// api =  https://api.thedogapi.com/v1/breeds
const router = Router();


async function apiInfo() {
    const api = await axios.get('https://api.thedogapi.com/v1/breeds')
     let info = api.data.map((d) => {
        return {
            Id: d.id,
            Name: d.name,
            Height_Min: parseInt(d.height.metric.slice(0, 2).trim()),
            Height_Max: parseInt(d.height.metric.slice(4).trim()),
            Weight_Min: parseInt(d.weight.imperial.slice(0, 2).trim()),
            Weight_Max: parseInt(d.weight.imperial.slice(4).trim()),
            YearsOfLife: d.life_span,
            Temperaments: d.temperament,
            Image: d.image.url
        };
   });
   return info;
};

async function db() {
    const db = await Dog.findAll({
        include: [{
            model: Temperament,
              attributes: [
                "Name"
              ],
              through: {attributes:[]}
        }],
    });
    return db;
};

router.get('/', async (req, res) => {
    const { name } = req.query
    const infoApi = await apiInfo();
    const dataBase = await db();
    const allDogs = infoApi.concat(dataBase);
    
    if(name && allDogs) {
        const findDog = allDogs.filter(el => el.Name.toLowerCase() === name.toLowerCase())
             
        return res.status(200).send(findDog);
    }
           
    if(!name && allDogs) {
        return res.status(200).send(allDogs)
    };
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const infoApi = await apiInfo();
    const dataBase = await db();
    const allDogs = infoApi.concat(dataBase);
     
    if(id && allDogs) {
        const dogId = allDogs.filter(d => d.Id == id)

         return res.status(200).send(dogId);
    }

     else {
        return res.status(404).send(allDogs)        
    };
});

router.post('/create', async (req, res) => {
    const { Name, 
            Height_Min, 
            Height_Max, 
            Weight_Min, 
            Weight_Max, 
            YearsOfLife, 
            Image, 
            Temperaments} = req.body

    // if(!Name || !Height_Min || !Height_Max || !Weight_Min || !Weight_Max)  return res.status(404).send("faltan datos");
            
        const newDog = await Dog.create({
            Name, 
            Height_Min, 
            Height_Max, 
            Weight_Min, 
            Weight_Max, 
            YearsOfLife, 
            Image
        });
        
        //buscamos en Country el pais relacionado con la actividad que acabamos de crear
        const tempDb = await Temperament.findAll({
            where: { Name: Temperaments }
        })
                 
        //le agregamos el pais a la actividad que creamos
        await newDog.addTemperament(tempDb)

        return res.status(200).send(newDog);

});
//🐾

module.exports = router;
