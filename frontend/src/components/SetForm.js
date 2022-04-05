import React, { useState } from "react";
import "../css/Form.scss";
import axios from "axios";

const SetForm = (props) => {
  const [set, setSet] = useState({
    timed: 0,
    reps: 0,
    weight: 0,
    setCount: 1,
    exercise_id: null,
  });

  const createSet = async (e) => {
    e.preventDefault();
    if (props.checkIfEmpty(set.timed, set.reps, set.weight))
      return alert("Fill out form");

    if (
      !props.checkIfNumber(set.timed) ||
      !props.checkIfNumber(set.reps) ||
      !props.checkIfNumber(set.weight) ||
      !props.checkIfNumber(set.setCount)
    ) {
      alert("Fields only allow numbers");
    } else {
      const newSet = {
        timed: set.timed,
        reps: set.reps,
        weight: set.weight,
        setCount: set.setCount,
        exercise_id: props.exercise.id,
      };
      await axios
        .post("/sets", newSet)
        .then((res) => {
          // setting new data to the list
          props.setSetData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const setOnChangeHandler = async (e) => {
    let currVal = await e.target.value;
    let currName = await e.target.name;
    if (currName === "timed") {
      setSet({ ...set, timed: Number(currVal) });
    } else if (currName === "reps") {
      setSet({ ...set, reps: Number(currVal) });
    } else if (currName === "weight") {
      setSet({ ...set, weight: Number(currVal) });
    } else if (currName === "set") {
      setSet({ ...set, setCount: Number(currVal) });
    }
  };
  return (
    <div>
     
      {props.sets ? (
        <form className="form" onSubmit={createSet}>
          {props.sets ? (
            <div>
              <input
                className="form__input"
                name="timed"
                onChange={setOnChangeHandler}
                placeholder="Time"
              />
            </div>
          ) : null}

          {props.sets ? (
            <div>
              <input
                className="form__input"
                name="reps"
                onChange={setOnChangeHandler}
                placeholder="Reps"
              />
              <input
                className="form__input"
                name="weight"
                onChange={setOnChangeHandler}
                placeholder="Weight"
              />
              <input
                className="form__input"
                name="set"
                onChange={setOnChangeHandler}
                placeholder="Set"
              />
            </div>
          ) : null}

          {props.sets || props.sets ? (
            <div>
              <button type="submit">Add Set</button>
            </div>
          ) : null}
        </form>
      ) : null}
    </div>
  );
};

export default SetForm;
