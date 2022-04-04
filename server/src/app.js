import { createConnection } from 'typeorm';

import 'reflect-metadata';

import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'

const mainLoop = async () => {
    try {
      await createConnection()
    

    const app = express();
    app.use(express.json());
    app.use(cors({ origin: '*' }));
    app.use(bodyParser.json())


app.listen(8000, () => {
  console.log('Server is up on 8000')
})

  } catch(err) {
    console.log(err)
  }
  
}

mainLoop();