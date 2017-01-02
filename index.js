import app from './server';
import { green, underline, bold } from 'chalk';

const PORT = process.env.PORT || 8080;

const start = 
  () => app.listen(
    PORT, 
    () => { 
      console.log(green.underline.bold(`Running reverse proxy on port ${PORT}`));
      console.log();
      console.log(`To use:\tlocalhost:${bold(PORT)}/fwd/${bold('ENCODED_URL_TO_FORWARD')} `);
      console.log();
      console.log(`i.e:\tlocalhost:${PORT}/fwd/${bold('google.com')}`);
      console.log(`or:\tlocalhost:${PORT}/fwd/${bold('https%3A%2F%2Fgoogle.com')}`);
      console.log();
      console.log('Note: Forwarded url must be fully encoded');
      console.log();
  });

start();