import { getRepository } from "typeorm";
import { Exercise } from "../entity/Exercise.js";

const exerciseController = {
  //CRUD
  create: async (exercise) => {
    const exerciseRepository = getRepository(Exercise);

    try {
      let newExercise = await exerciseRepository
        .createQueryBuilder()
        .insert()
        .into(Exercise)
        .values(exercise)
        .execute();

      return newExercise;
    } catch {
      return false;
    }
  },

  read: async (id) => {
    const exerciseRepository = getRepository(Exercise);

    try {
      let exercise = await exerciseRepository
        .createQueryBuilder("exercise")
        .select()
        .where("exercise.id = :id", {
          id: id,
        })
        .getOneOrFail();

      return exercise;
    } catch (err) {
      console.log("Error at read exercise", err);
      return false;
    }
  },

  readAll: async () => {
    const exerciseRepository = getRepository(Exercise);

    try {
      let exercises = await exerciseRepository
        .createQueryBuilder("exercise")
        .select()
        .getMany();

      return exercises;
    } catch (err) {
      console.log("Error at read exercise", err);
    }
  },

  update: async (id, name, type) => {
    const exerciseRepository = getRepository(Exercise);

    try {
      let exercise = await exerciseRepository
        .createQueryBuilder("exercise")
        .update(Exercise)
        .where("exercise.id = :id", {
          id: id,
        })
        .set({
          name: name,
          type: type
        })
        .execute();

      let checkExercise = await exerciseController.read(id);
      if (checkExercise.name === name) {
        return checkExercise;
      } else {
        return false;
      }
    } catch (err) {
      console.log("Error at read exercise", err);
      return false;
    }
  },

  delete: async (id) => {
    const exerciseRepository = getRepository(Exercise);

    try {
      let exercise = exerciseRepository
        .createQueryBuilder("exercise")
        .delete()
        .from(Exercise)
        .where("exercise.id = :id", {
          id: id,
        })
        .execute();
      return exercise;
    } catch (err) {
      console.log("Error at read exercise", err);
      return false;
    }
  },
};

export { exerciseController };
