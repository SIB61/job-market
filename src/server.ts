import 'module-alias/register';
import { config } from 'dotenv'
import connectDb from './config/db';
import app from '@/app';
import logger from './utils/logger';

config({})
config({ path: `.env.local`, override: true });

const port = process.env.PORT || 3000;

connectDb()

app.listen(port, () => {
  logger.info(
    `Server is running at http://localhost:${port}`
  )
});


