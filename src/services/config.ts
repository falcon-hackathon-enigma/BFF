import 'dotenv/config';

const {
  NODE_ENV,
  PORT,
}: any = process.env;

export default {
  app: {
    env: NODE_ENV,
    port: PORT || 8080,
  },
};
