const router = require('express').Router();
const { Offer, Request, User } = require('../../models');

////////////
///OFFERS///
////////////

//get all offers
router.get('/', (req, res) => {
    Offer.findAll({
        include:[{
            model: Offer,
        }]
    })
    .then(offerData => res.json(offerData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err); 
    });
});

//get a single offer post
router.get('/:id', (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products 
    Category.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Offer,
        }
      ]
    })
      .then(offerData => {
        if (!offerData) {
          res.status(404).json({ message: 'There are no offers with that ID.' });
          return;
        }
        res.json(offerData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  });

//create a new offer
router.post('/', (req, res) => {
    // create a new category
    Offer.create({
      offer_name: req.body.offer_name
    })
      .then(offerData => res.json(offerData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


