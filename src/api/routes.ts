import * as express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('hello from route')
})
export default router;
