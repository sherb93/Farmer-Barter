const router = require("express").Router();
const { Offer, Request, User } = require('../models');
const { response } = require("./api");

module.exports = router;

////////////
///OFFERS///
////////////

//get all offers
router.get('/offers', (req, res) => {
    Offer.findAll({
      include: [
        {
          model: User,
          attributes: ["username", "email", "location"]
        }
      ]
    })
    .then(offerData => {
    
    const offers = offerData.map(offer => offer.get({ plain: true }))

    res.render('offers', { offers, loggedIn: req.session.loggedIn })
    })
    //res.render, pass in offer data, activity 16
    .catch(err => {
        console.log(err);
        res.status(500).json(err); 
    });
});

//get a single offer post
router.get('/offers/:id', (req, res) => {
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
        res.render('home', { serializedOffer, loggedIn: req.session.loggedIn });
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
router.get('/requests', (req, res) => {
    Request.findAll()
    .then(requestData => res.json(requestData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err); 
    });
});

//get a single request
router.get('/requests/:id', (req, res) => {
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

////////////
///CREATE///
////////////


  //get all requests
router.get('/create', (req, res) => {
    res.render('createpostpage', { loggedIn: req.session.loggedIn });
});