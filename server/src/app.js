import { createConnection } from 'typeorm';

import 'reflect-metadata';

import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import {exerciseRouter} from './route/exercise.js'
import { setsRouter } from './route/sets.js';
import { exerciseController } from './controller/exercise.js';
import { setsController } from './controller/sets.js';

const mainLoop = async () => {
    try {
      await createConnection()
    
      //adding seed data if database is empty
      let exercise = await exerciseController.readAll()
      async function addExerciseSeedData() {
        await exerciseController.create({name:'Bench Press', type: 'Reps'})
        await exerciseController.create({name:'Treadmill', type:'Timed'})

      }

      async function addSetSeedData() {
        await setsController.create({timed: 0, reps: 10, weight:145, setCount: 1, exercise_id:1})
        await setsController.create({timed: 0, reps: 8, weight:150, setCount: 2, exercise_id:1})
        await setsController.create({timed: 0, reps: 7, weight:155, setCount: 3, exercise_id:1})

        await setsController.create({timed:10, setCount:1, reps: 0, weight: 0,  exercise_id:2})
        await setsController.create({timed:20, setCount:2, reps: 0, weight: 0,  exercise_id:2})
        await setsController.create({timed:30, setCount:3, reps: 0, weight: 0,  exercise_id:2})

      }


      if (exercise.length === 0) {
        await addExerciseSeedData()
        await addSetSeedData()


      }

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