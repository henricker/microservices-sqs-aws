import express from 'express';
import router from './routes/routes';

const app = express();

app.use(express.json());
app.use(router);

app.listen(process.env.PORT || 8000, () => console.log('Running on port ' + process.env.PORT || 8000));