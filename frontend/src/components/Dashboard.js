import React, { useState } from "react";
import SetForm from "./SetForm";
import "../css/Dashboard.scss";
import ExerciseForm from "./ExerciseForm";
import SetModal from "./SetModal";
import axios from "axios";
import Trash from '../img/trash.svg'
import Edit from "../img/edit.svg";


const Dashboard = (props) => {
  const [open, setOpen] = useState(false);
  const [timed, setTimed] = useState(false);
  const [reps, setReps] = useState(false);
  const [exercise, setExercise] = useState(null);
  const [set, setSet] = useState(null);


  const onChangeHandler = async (e) => {
    if (e.target.value === "Timed") {
      setTimed(true);
      setReps(false);
    } else if (e.target.value === "Reps") {
      setTimed(false);
      setReps(true);
    }
  };

  //getting new sets data by the exercise_id
  const setSetData = async (item) => {
   await axios
      .get(`/sets/${item.id}`)
      .then((res) => {
        setSet(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }

  const deleteExercise = async (id) => {
    await axios.delete(`/exercise/${id}`)
      .then(res => {
        props.getExercises()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getSingleExercise = async (item) => {
    setExercise(item);
    await setSetData(item)
  };

  return (
    <div className="dashboard">
      <div className="dashboard__list">


      {props.exercises
        ? props.exercises.map((exercise) => {
            return (
              <div className="dashboard__list__item"  key={exercise.id}>
                <p className="dashboard__list__item__name">
                  {exercise.name}
                </p>
                <div className="dashboard__list__item__images">
                  <p  onClick={() => {
                      setOpen(true);
                      getSingleExercise(exercise);
                    }}>Edit</p>
                <img  onClick={() => {
                      setOpen(true);
                      getSingleExercise(exercise);
                    }} src={Edit} alt="edit" />

                <img onClick={() => deleteExercise(exercise.id)} src={Trash} alt="trash" />
                </div>
              </div>
            );
          })
        : null}

      {!exercise ? (
        <div>
          <SetForm
           
            timed={timed}
            reps={reps}
            onChangeHandler={onChangeHandler}
          />

          <ExerciseForm
            onChangeHandler={onChangeHandler}
            getExercises={props.getExercises}
            isEdit={false}
            
          />
        </div>
      ) : (
        <div>
          
          <ExerciseForm
            onChangeHandler={onChangeHandler}
            exercise={exercise}
            setExercise={setExercise}
            getExercises={props.getExercises}
            isEdit={true}
          />
          
        </div>
      )}
      
        </div>
      {open ? (
        <div className="dashboard__modal">
          <SetModal setOpen={setOpen} setSetData={setSetData} exercise={exercise} setExercise={setExercise} set={set} />
        </div>
      ) : null}
    </div>
  );
};

export default Dashboard;
