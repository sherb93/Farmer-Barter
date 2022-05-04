const router = require("express").Router();
const { Offer, Request, User } = require('../../models');

module.exports = router;

//create a new offer
router.post('/', (req, res) => {
    // create a new category
    Offer.create({
      title: req.body.title, 
      content: req.body.content,
      date_available: req.body.date_available,
      location: req.body.location,
      crop: req.body.crop,
      quantity: req.body.quantity, 
    })
      .then(offerData => res.json(offerData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });