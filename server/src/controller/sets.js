import { getRepository } from "typeorm";
import { Sets } from "../entity/Sets.js";
import { exerciseController } from "./exercise.js";

const setsController = {
  //CRUD
  create: async (sets) => {
    const setsRepository = getRepository(Sets);

    console.log("Sets", sets);
    try {
      let newSets = await setsRepository
        .createQueryBuilder()
        .insert()
        .into(Sets)
        .values(sets)
        .execute();
        const id = await newSets.identifiers[0].id
        console.log('ID', id)
        const exercise = await exerciseController.read(sets.exercise_id)
        console.log('10',exercise)
      return exercise;
    } catch {
      return false;
    }
  },

  readAllById: async (exerciseId) => {
    const setsRepository = getRepository(Sets);

    try {
      let sets = await setsRepository
        .createQueryBuilder("sets")
        .select()
        .where("sets.exercise_id = :exercise_id", {
          exercise_id: exerciseId
        })
        .getMany();

      return sets;
    } catch (err) {
      console.log("Error at read sets", err);
      return false;
    }
  },

  readOneById: async (id) => {
    const setsRepository = getRepository(Sets);

    try {
      let sets = await setsRepository
        .createQueryBuilder("sets")
        .select()
        .where("sets.id = :id", {
          id: id
        })
        .getOneOrFail();

      return sets;
    } catch (err) {
      console.log("Error at read sets", err);
      return false;
    }
  },

  

  readAll: async () => {
    const setsRepository = getRepository(Sets);

    try {
      let sets = await setsRepository
        .createQueryBuilder("sets")
        .select()
        .getMany();

      return sets;
    } catch (err) {
      console.log("Error at read sets", err);
    }
  },

  update: async (id, set) => {
    const updatedSet = {
      timed: set.timed,
      reps: set.reps,
      weight: set.weight,
      setCount: set.setCount
    }
    try {
      const setsRepository = getRepository(Sets);

      let changeSet = await setsRepository
        .createQueryBuilder("sets")
        .update(Sets)
        .where("sets.id = :id", {
          id: id,
        })
        .set(updatedSet)
        .execute();

      if (changeSet) {
        return changeSet;
      } else {
        return false;
      }
    } catch (err) {
      console.log("Error at update sets", err);
      return false;
    }
  },


  delete: async (id) => {
    const set = await setsController.readOneById(id)
    const exercise = await exerciseController.read(set.exercise_id)
    const setsRepository = getRepository(Sets);

    try {
      let sets = await setsRepository
        .createQueryBuilder("sets")
        .delete()
        .from(Sets)
        .where("sets.id = :id", {
          id: id,
        })
        .execute();
        console.log('new sets', sets)
      return exercise;
    } catch (err) {
      console.log("Error at read sets", err);
      return false;
    }
  },
};

export { setsController };
