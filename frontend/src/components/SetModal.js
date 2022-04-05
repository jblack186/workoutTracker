import React, { useState, useEffect } from "react";
import "../css/Modal.scss";
import SetForm from "./SetForm";
import axios from "axios";
import Trash from "../img/trash.svg";
import Edit from "../img/edit.svg";
import Plus from "../img/plus.svg";
import Back from "../img/back.svg";
import EditForm from "./EditSetForm";

const SetModal = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [currSet, setCurrSet] = useState(null);

  useEffect(() => {}, []);

  const deleteSet = async (id) => {
    await axios
      .delete(`/sets/${id}`)
      .then((res) => {
        props.setSetData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editSet = async (set) => {
    setIsEdit(true);
    setCurrSet(set);
  };

  const checkIfNumber = (num) => {
    if (isNaN(num)) {
      return false;
    } else {
      return true;
    }
  };

  const checkIfEmpty = (time, reps, weight) => {
    if (time === 0 && reps === 0 && weight === 0) {
      return true;
    }
  };

  const goBack = () => {
    props.setOpen(false)
    setIsEdit(false)
    props.setExercise(null)
  }

  return (
    <div className="modal">
      <strong><p onClick={goBack}>Close</p></strong>
      {isEdit ? <img onClick={() => setIsEdit(false)} src={Back} alt="arrow" /> : null}
      <h2 className="modal__header">
        {props.exercise && props.exercise.name}{" "}
        <span>{props.exercise && props.exercise.type}</span>
      </h2>
      <div className="modal__show">
      {!isEdit && props.set && props.set.length > 0
        ? props.set.map((set) => {
            return (
              <div className="modal__list" key={set.id}>
                {props.exercise && props.exercise.type === "Timed" ? (
                  <p>Time: {set.timed} minutes</p>
                ) : null}

                {props.exercise && props.exercise.type === "Reps" ? (
                  <div>
                    <p>Reps: {set.reps}</p>

                    <p>Weight: {set.weight} lbs</p>
                  </div>
                ) : null}
                <p>Set#: {set.setCount}</p>
                <div className="modal__list__images">
                   {!isEdit && props.set && props.set.length > 0 ? (
                    <img src={Edit} onClick={() => editSet(set)} alt="edit" />
                  ) : (
                    <img src={Plus} onClick={() => setIsEdit(false)} alt="plus" />
                  )}
                  <img src={Trash} onClick={() => deleteSet(set.id)} alt="trash" />
                </div>
              </div>
            );
          })
        : null}
      </div>
      {isEdit && props.set && props.set.length === 0 ? <p>No sets</p> : null}
      {!isEdit ? (
        <SetForm
          checkIfEmpty={checkIfEmpty}
          checkIfNumber={checkIfNumber}
          currSet={currSet}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setSetData={props.setSetData}
          exercise={props.exercise}
          sets={props.set}
        />
      ) : (
        <EditForm
          checkIfEmpty={checkIfEmpty}
          checkIfNumber={checkIfNumber}
          currSet={currSet}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setSetData={props.setSetData}
          exercise={props.exercise}
          sets={props.set}
        />
      )}
    </div>
  );
};

export default SetModal;
