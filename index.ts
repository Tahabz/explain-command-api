import express from 'express'
import morgan from 'morgan'
import connect from './db/connect'
import developRouter from './routes/develop/router'
import userRouter from './routes/user/user'

require('dotenv').config();


const app = express()

app.use(express.json());
app.use(morgan('dev'))

app.use('/explain-command', userRouter)

app.use('/api', developRouter)
app.get('*', (req, res) => {
	res.status(404).json({success: false, message: "resource does not exist"})
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