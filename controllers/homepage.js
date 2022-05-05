const router = require("express").Router();
const { Offer, Request, User } = require('../models');
const { response } = require("./api");

////////////
///OFFERS///
////////////

//get all offers
router.get("/", (req, res) => {
  res.render("login", { loggedIn: req.session.loggedIn });
});


router.get('/offers', (req, res) => {
    Offer.findAll({
      include: [
        {
          model: User,
          attributes: ["username", "email"]
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
      include: [
        {
          model: User,
          attributes: ["username", "email", "location"]
        }
      ]  
    })
    .then(offerData => {
      if (!offerData) {
        res.status(404).json({ message: 'There are no offers with that ID.' });
        return;
      }
      const offer = offerData.get({ plain: true });

      res.render('offers', { offer, loggedIn: req.session.loggedIn });
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
  Request.findAll({
    include: [
      {
        model: User,
        attributes: ["username", "email", "location"]
      }
    ]
  })
  .then(requestData => {
  
  const requests = requestData.map(request => request.get({ plain: true }))

  res.render('requests', { requests, loggedIn: req.session.loggedIn })
  })
  //res.render, pass in request data, activity 16
  .catch(err => {
      console.log(err);
      res.status(500).json(err); 
  });
});

//get a single request
router.get('/requests/:id', (req, res) => {
  // find one category by its `id` value
  Request.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: User,
        attributes: ["username", "email", "location"]
      }
    ]  
  })
  .then(requestData => {
    if (!requestData) {
      res.status(404).json({ message: 'There are no requests with that ID.' });
      return;
    }
    const request = requestData.get({ plain: true });

    res.render('requests', { request, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});


module.exports = router;
