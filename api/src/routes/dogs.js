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
            Height: `${d.height.metric} cm`,
            Weight: `${ d.weight.metric } Kg`,
            YearsOfLife: d.life_span,
            Temperament: d.temperament,
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

router.post('/', async (req, res) => {
    const { Name, Height, Weight, YearsOfLife, Image, Temperaments} = req.body

    if(!Name || !Height || !Weight)  return res.status(404).send("faltan datos");
    
        const newDog = await Dog.create({
            Name, 
            Height, 
            Weight, 
            YearsOfLife, 
            Image
        });
        console.log(newDog);
        //buscamos en Country el pais relacionado con la actividad que acabamos de crear
        const tempDb = await Temperament.findAll({
            where: { Name: Temperaments }
        })

        //le agregamos el pais a la actividad que creamos
        newDog.addTemperament(tempDb)

        return res.status(200).send(newDog);
});
//🐾

module.exports = router;

  
/*

async function apiInfo() {
    const api = await axios.get('https://api.thedogapi.com/v1/breeds')
     let info = api.data.map((d) => {
        return {
            Id: d.id,
            Name: d.name,
            Height: `${d.height.metric} cm`,
            Weight: `${ d.weight.metric } Kg`,
            YearsOfLife: d.life_span,
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
        const findDog = allDogs.filter(el => el.Name.toLowerCase().include === name.toLowerCase())
             
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

router.post('/', async (req, res) => {
    const { Name, Height, Weight, YearsOfLife, Image } = req.body

    if(!Name || !Height || !Weight) return res.status(404).send("faltan datos");
    
    try {
        const newDog = await Dog.create(req.body);

        return res.status(200).send(newDog);
    } catch(error) {
        res.status(404).send("No se creo nada")
    };
});*/