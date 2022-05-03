const router = require('express').Router();
const offerRoutes = require('./offerRoutes');
const requestRoutes = require('./requestRoutes');

router.use('/offers', offerRoutes);
router.use('/requests', requestRoutes);

module.exports = router;
