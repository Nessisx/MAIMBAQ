const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'API saludable',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
