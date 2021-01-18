import express from 'express'
import morgan from 'morgan'
import connect from './db/connect'

require('dotenv').config();


const app = express()

app.use(express.json());
app.use(morgan('dev'))
app.get('/', (req, res) => {
	console.log(req.body);
  res.send('Hello World')
})

app.post('/', (req, res) => {
	console.log(req.body);
  res.send('Hello World')
})

const start = async () => {
	try {
	  await connect();
	  app.listen(process.env.PORT, () => {
		console.log(`Server up and running on port ${process.env.PORT} !`);
	  });
	} catch (e) {
	  console.log(e);
	}
};

start()