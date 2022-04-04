import {EntitySchema} from "typeorm"

export const Sets = new EntitySchema({
  name: 'Sets',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    timed: {
      type: 'int',
      nullable: false,

    },
    reps: {
      type: 'int',
      nullable: false,
    },

    weight: {
      type: 'int',
      nullable: false
    },

    setCount: {
      type: 'int',
      nullable: false
    },

    exercise_id: {
      type: 'int',
      nullable: false
    }
  },

  relations: {
    exercise: {
      type: 'many-to-one',
      target: 'Exercise',
      joinColumn: {
        name: 'exercise_id',
      },
      inverseSide: 'sets' 
    }
  },
});