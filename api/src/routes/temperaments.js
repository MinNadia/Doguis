const { Router } = require ('express');
const axios = require('axios');
const { Dog, Temperament } = require('../db');
const { Sequelize } = require('sequelize');
// api =  https://api.thedogapi.com/v1/breeds
const router = Router();

async function apiTemp() {
    const api = await axios.get('https://api.thedogapi.com/v1/breeds')
        const info = api.data.map((t) => {
          return {
             Name: t.temperament
          }
        });
        return info;
};

router.get('/', async (req, res) => {
  const temperament = await apiTemp();
  const tempSplit = temperament?.map(temperament => temperament.Name?.split(", "));
  const tempJoin = tempSplit.join(",").split(",");

  if(tempJoin) {
    
    tempJoin.forEach(e => {
      Temperament.findOrCreate({
          where:{
              Name: e}
      })
   });

    const dbTemp = await Temperament.findAll({
      include: [{
        model: Dog,
        attributes:[
          "Name",
          "Height_Min",
          "Height_Max",
          "Weight_Min",
          "Weight_Max",
          "YearsOfLife"
        ],
        through: {attributes:{}}
      }],
    });
    
    return res.status(200).send(dbTemp);

  } else {
    res.status(404).send("No trajo nada");
  };    
});
//🐾

module.exports = router;
