import * as express from 'express';
const cardList = require('../content/cards.json');
const router = express.Router();

router.get('/cards', async (req, res) => {
  res.send(cardList);
});

router.post('/chat', async (req, res) => {
  res.send('hello from route');
});
export default router;
