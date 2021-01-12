import express from 'express'
import connect from './db/connect'
require('dotenv').config();


const app = express()

app.get('/', (req, res) => {
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