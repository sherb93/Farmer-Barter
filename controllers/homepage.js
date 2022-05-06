const router = require("express").Router();
const { Offer, Request, User } = require('../models');

////////////
///OFFERS///
////////////

//get all offers
router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/offers');
    return;
  }

  res.render('login');
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

    console.log(req.session);

    res.render('all-offers', { offers, loggedIn: req.session.loggedIn, userid: req.session.userid })
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
          attributes: ["username", "email"]
        }
      ]  
    })
    .then(offerData => {
      if (!offerData) {
        res.status(404).json({ message: 'There are no offers with that ID.' });
        return;
      }
      const offer = offerData.get({ plain: true });

      res.render('offer', { offer, loggedIn: req.session.loggedIn });
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
        attributes: ["username", "email"]
      }
    ]
  })
  .then(requestData => {
  
  const requests = requestData.map(request => request.get({ plain: true }))

  res.render('all-requests', { requests, loggedIn: req.session.loggedIn })
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
        attributes: ["username", "email"]
      }
    ]  
  })
  .then(requestData => {
    if (!requestData) {
      res.status(404).json({ message: 'There are no requests with that ID.' });
      return;
    }
    const request = requestData.get({ plain: true });

    res.render('request', { request, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get("/createpost", (req, res) => {
  res.render('createpost', { loggedIn: req.session.loggedIn, userid: req.session.userid });
});


module.exports = router;
