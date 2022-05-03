const router = require('express').Router();
const { Category, Request } = require('../../models');

//////////////
///REQUESTS///
//////////////

//get all requests
router.get('/', (req, res) => {
    Request.findAll({
        include:[{
            model: Request,
        }]
    })
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
    Category.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Request,
        }
      ]
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

//create a new request
  router.post('/', (req, res) => {
    // create a new category
    Request.create({
      request_name: req.body.request_name
    })
      .then(requestData => res.json(requestData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });