import { createConnection } from 'typeorm';

import 'reflect-metadata';

import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import {exerciseRouter} from './route/exercise.js'
import { setsRouter } from './route/sets.js';

const mainLoop = async () => {
    try {
      await createConnection()
    

    const app = express();
    app.use(express.json());
    app.use(cors({ origin: '*' }));
    app.use(bodyParser.json())
    app.use('/exercise', exerciseRouter)
    app.use('/sets', setsRouter)

    const PORT = 8080

app.listen(PORT, () => {
  console.log(`Server is up on ${PORT}`)
})

  } catch(err) {
    console.log(err)
  }
  
}

mainLoop();