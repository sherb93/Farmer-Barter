const router = require("express").Router();
const { Request } = require('../../models');

module.exports = router;

//create a new request
router.post('/', (req, res) => {
    // create a new category
    Request.create({
      title: req.body.title, 
      content: req.body.content,
      date_available: req.body.date_available,
      location: req.body.location,
      crop: req.body.crop,
      quantity: req.body.quantity, 
    })
      .then(requestData => res.json(requestData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });