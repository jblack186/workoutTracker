import {EntitySchema} from "typeorm"

export const Exercise = new EntitySchema({
    name: "Exercise", 
    tableName: "exercise", 
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar",
            nullable: false,
            
        },
        type: {
          type: "varchar",
          nullable: false
        }
         },
        relations: {
          exercise: {
            type: 'one-to-many',
            target: 'Sets',
            cascade: true,
            inverseSide: 'exercise' 
          }
        },
      
   
});