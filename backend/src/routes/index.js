const { Router } = require('express');

const healthRoutes = require('./health.routes');
const artworkRoutes = require('./artwork.routes');

const router = Router();

router.use('/health', healthRoutes);
router.use('/artworks', artworkRoutes);

module.exports = router;
