import { exerciseController } from "../controller/exercise.js";
import express from "express";
import { setsController } from "../controller/sets.js";
var exerciseRouter = express.Router();

exerciseRouter.post("/", async function (req, res, next) {
  console.log("nope", await req.body);

  try {
    //request body
    let exercise = await req.body;

    let newExercise = await exerciseController.create(exercise);

    // if response body is empty return error status
    if (!newExercise) {
      return res.status(400).json({ error: "Failed to create exercise" });
    }
    //if newExercise is returned (made it past the above if statement) return created status code
    res.status(201).json({
      message: "Created exercise",
      data: newExercise,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ err: err.toString() });
  }
});

exerciseRouter.get("/:id", async function (req, res) {
  let id = req.params.id;

  let exercise = await exerciseController.read(id);
  if (exercise) {
    res.status(201).json({ exercise });
  } else {
    res.status(400).json({ message: "Could not get exercise" });
  }
});

exerciseRouter.get("/", async function (req, res) {
  let exercises = await exerciseController.readAll();

  if (exercises.length > 0) {
    res.status(200).json({ exercises });
  } else {
    res.status(400).json({ message: "Could not get exercises" });
  }
});

exerciseRouter.put("/", async function (req, res) {
  let exercise = req.body;
  let id = await exercise["id"];
  let name = await exercise["name"];
  let type = await exercise["type"];
  let updatedExercise = await exerciseController.update(id, name, type);

  if (updatedExercise) {
    res.status(202).json({ data: updatedExercise });
  } else {
    res.status(400).json({ message: "Failed to update exercise" });
  }
});

exerciseRouter.delete("/:id", async function (req, res) {
  let id = req.params.id;
  //sets are dependent on their respective exercises so they must be deleted before their exercise
  //reading all sets of of a given exercise through exercise_id
  let sets = await setsController.readAllById(id);
//loop through those sets and delete them one by one
  for (let i = 0; i < sets.length; i++) {
    let currSet = await sets[i];
    console.log("curr", currSet);
    await setsController.delete(currSet.id);
  }

  //grabing the length all exercises before the one to be deleted has been
  let getCurrExercises = await exerciseController.readAll();
  let getCurrExercisesCount = getCurrExercises.length;

  let exercise = await exerciseController.delete(id);
  let newExercise = await exerciseController.readAll();

  //if the new length is less than the old lenght then return a updated status code
  if (newExercise.length < getCurrExercisesCount) {
    res.status(202).json({
      message: "Succesfully deleted",
      data: newExercise,
    });
  } else {
    res.status(400).json({ message: "Failed to delete exercise" });
  }
  console.log("Deleted", exercise);
});

export { exerciseRouter };
