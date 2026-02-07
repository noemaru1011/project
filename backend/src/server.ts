import app from './app';

const port = Number(process.env.BACK_PORT) || 3000;
const host = process.env.BACK_HOST || '0.0.0.0';

app.listen(port, host, () => {
  console.log('start express server');
});
