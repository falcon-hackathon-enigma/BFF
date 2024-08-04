import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as https from 'https';
import { Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';
const PORT = process.env.PORT || 3000;
import * as cors from 'cors';
import routes from './src/api/routes';
import * as fs from 'fs';

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/health', (req: Request, res: Response) => res.send('Status: OK'));

app.use('/api', routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
  });
});
const options = {
  key: fs.readFileSync('./certs/key.pem'),
  cert: fs.readFileSync('./certs/cert.pem'),
};

https.createServer(options, app).listen(443, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});
