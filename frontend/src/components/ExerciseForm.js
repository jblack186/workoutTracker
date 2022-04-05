import React, { useState, useEffect } from "react";
import "../css/Form.scss";
import axios from "axios";

function ExerciseForm(props) {
  const [exercise, setExercise] = useState({
    name: !props.isEdit ? "" : props.exercise.name,
    type: !props.isEdit ? "" : props.exercise.type,
    id: !props.isEdit ? "" : props.exercise.id,
  });

  useEffect(() => {
    setExercise({ ...props.exercise });
  }, [props]);


  const exerciseOnChangeHandler = async (e) => {
    if (e.target.name === "type") {
      setExercise({ ...exercise, type: e.target.value });
    } else if (e.target.name === "name") {
      setExercise({ ...exercise, name: e.target.value });
    }
  };

  const createExercise = async (e) => {
    e.preventDefault();
    if (!exercise.name || !exercise.type) {
      alert("The form needs to be filled out");
    } else {
      let newExercise = {
        name: exercise.name,
        type: exercise.type,
      };
      axios
        .post("/exercise", newExercise)
        .then((res) => {
          setExercise({
            name: "",
            type: "",
          });
          props.getExercises();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const editExercise = async (e) => {
    e.preventDefault();
    // if either field (name or type) are empty alert the user that they both are required
    if ((props.isEdit && !exercise.name) || (props.isEdit && !exercise.type)) {
      alert("The form needs to be filled out");
    } else {
      await axios
        .put("/exercise", exercise)
        .then((res) => {
          props.setExercise(null);
          props.getExercises();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="form-container">
      <h3 className="form-container__header">{!props.isEdit ? "Create Exercise" : `Edit ${props.isEdit && props.exercise && props.exercise.name} exercise`}<span> {props.isEdit && props.exercise && props.exercise.type.toLowerCase()}</span></h3>
      <p>{props.yes}</p>
      <form
        className="form"
        onSubmit={!props.isEdit ? createExercise : editExercise}
      >
        <div className="form__content">
          <input
            className="form__content__input"
            name="name"
            onChange={exerciseOnChangeHandler}
            placeholder={!props.isEdit ? "Name" : "Select new name"}
          />

          <select name="type" value="none" onChange={exerciseOnChangeHandler}>
            <option value="none" disabled hidden>
              {!props.isEdit ? "Select type" : "Select new type"}
            </option>
            <option value="Timed">Timed</option>
            <option value="Reps">Reps</option>
          </select>
        </div>
        <p>{exercise.type ? exercise.type : "Select type of exercise"}</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ExerciseForm;
