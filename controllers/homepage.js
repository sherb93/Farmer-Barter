const router = require("express").Router();
const { Offer, Request, User } = require('../models');

module.exports = router;

////////////
///OFFERS///
////////////

//get all offers
router.get('/', (req, res) => {
    Offer.findAll()
    .then(offerData => res.json(offerData)) //res.render, pass in offer data, activity 16
    .catch(err => {
        console.log(err);
        res.status(500).json(err); 
    });
});

//get a single offer post
router.get('/:id', (req, res) => {
    // find one category by its `id` value
    Offer.findOne({
      where: {
        id: req.params.id
      },  
    })
      .then(offerData => {
        if (!offerData) {
          res.status(404).json({ message: 'There are no offers with that ID.' });
          return;
        }
        const serializedOffer = offerData.get({ plain: true });
        res.render('homepage', { serializedOffer, loggedIn: req.session.loggedIn });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  });

//////////////
///REQUESTS///
//////////////

//get all requests
router.get('/', (req, res) => {
    Request.findAll()
    .then(requestData => res.json(requestData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err); 
    });
});

//get a single request
router.get('/:id', (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products 
    Request.findOne({
      where: {
        id: req.params.id
      },    
    })
      .then(requestData => {
        if (!requestData) {
          res.status(404).json({ message: 'There are no requests with that ID.' });
          return;
        }
        res.json(requestData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  });