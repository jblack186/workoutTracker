import React, { useState } from "react";
import "../css/Form.scss";
import axios from "axios";

const EditSetForm = (props) => {
  const [editName, setEditName] = useState(null);
  const [editNumber, setEditNumber] = useState(null);
  const [editTitle, setEditTitle] = useState(null);

  const updateSet = async () => {
    
    if (!props.checkIfNumber(editNumber)) {
      alert("Fields only allow numbers");
    } else {
      //payload to be given to http request
      const newSet = {
        timed: props.currSet.timed,
        reps: props.currSet.reps,
        weight: props.currSet.weight,
        setCount: props.currSet.setCount,
      };
      //setting the field that was selected to be changed and assigning as a value to it's respective key
      newSet[editTitle] = editNumber;
      await axios
        .put(`/sets/${props.currSet.id}`, newSet)
        .then((res) => {
          props.setIsEdit(false);
          //setting the new data
          props.setSetData(props.exercise);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const setChangeHandler = async (e) => {
    setEditNumber(Number(e.target.value));
  };

  return (
    <div className="edit-form">
      <h3>Edit set</h3>
      <strong><h4 className="edit-form__text">Click values edit</h4></strong>
      {props.currSet ? (
        <div>
          <p
            onClick={() => {
              setEditName(`Current time = ${props.currSet.timed}`);
              setEditTitle("timed");
            }}
          >
            Time: {props.currSet.timed}
          </p>
          <p
            onClick={() => {
              setEditName(`Current reps = ${props.currSet.reps}`);
              setEditTitle("reps");
            }}
          >
            Reps: {props.currSet.reps}
          </p>
          <p
            onClick={() => {
              setEditName(`Current weight = ${props.currSet.weight}`);
              setEditTitle("weight");
            }}
          >
            Weight: {props.currSet.weight}
          </p>
          <p
            onClick={() => {
              setEditName(`Current set = ${props.currSet.setCount}`);
              setEditTitle("setCount");
            }}
          >
            Set#: {props.currSet.setCount}
          </p>
        </div>
      ) : null}

      {editName}
      {editName ? (
        <div>
          <input onChange={setChangeHandler} placeholder="update value" />{" "}
          <button type="r" onClick={() => updateSet(editName)}>
            Update set
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default EditSetForm;
