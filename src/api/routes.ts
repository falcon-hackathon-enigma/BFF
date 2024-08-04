import * as express from 'express';
import axios from 'axios';
import https from 'https';
const cardList = require('../content/cards.json');
const router = express.Router();

// const axiosInstance = axios.create({
//   timeout: 1200000,
//   httpAgent: new https.Agent({
//     rejectUnauthorized: false,
//     keepAlive: true,
//     keepAliveMsecs: 600000
//   })
// })

router.get('/cards', async (req, res) => {
  res.send(cardList);
});

router.post('/chat', async (req, res) => {
  const userMsg = req.body.msg;
  const options = {
    systemMsg: '',
    usrMsg: userMsg,
  };
  try {
    console.log(`Calling RAG`);
    const resp = await axios.post(
      `http://54.208.1.178:8888/genai/llm/creditcards`,
      options,
    );
    console.log(`Response Received from RAG`);
    const content = resp?.data?.choices[0]?.message?.content;
    res.send(content);
  } catch (ex: any) {
    console.log(`Error while Calling RAG API ${ex.message}`);
    res.send(ex.message);
  }
});
export default router;
