import React, {useState} from "react";
import './App.css';
import './components/Dashboard'
import Dashboard from './components/Dashboard';
import { Route, Routes } from "react-router-dom";
import axios from 'axios';

function App() {
  const [exercises, setExercises] = useState(null);


  


//getting all exercises
  const getExercises = async () => {
    await axios.get('/exercise')
      .then(res => {
        setExercises(res.data.exercises)
      })
      .catch(err => {
        console.log('failed to exercises', err)
      })
  }

  useState(() => {
    getExercises()
  }, [])




  return (
    <div className="App">
<Routes>
<Route path="/" element={ <Dashboard exercises={exercises} getExercises={getExercises}  /> } />
</Routes>
    </div>
  );
}

export default App;
