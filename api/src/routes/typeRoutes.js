const express = require('express');
const axios = require('axios');
const router = express.Router();
const { Type } = require('../db');

router.get("/", async (req, res, next) => {
        try {
          let getAllTypes = await axios.get("https://pokeapi.co/api/v2/type");
          let allTypes = getAllTypes.data.results;
      
          allTypes.forEach((item) => {
            Type.findOrCreate({
              where: {
                name: item.name,
              },
            });
          });
          const typesDb = await Type.findAll();
          res.send(typesDb);
        } catch (error) {
          next(error);
        }
      });

module.exports = router;