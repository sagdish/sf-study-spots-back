const router = require('express').Router();
const axios = require('axios');

const Spot = require('../database/SFspotsModel');

router.route('/')
  .get((req, res) => {
    Spot.find()
      .then(spots => {
        res.status(200).json(spots);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  })
  .post((req, res) => {
    const newSpot = req.body;
    const spot = new Spot(newSpot);

    spot.save()
      .then(spot => {
        res.status(201).json(spot);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  });

router.route('/coffeelist')
  .get((req, res) => {
    axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.790754,-122.451414&name=&keyword=study,quiet&rankby=distance&key=${process.env.gMapsApi}&type=cafe`
    ).then(response => {
      res.json(response.data.results)
    })
  })

  module.exports = router;