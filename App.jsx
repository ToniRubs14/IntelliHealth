import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserWorkoutPlan from "./components/userworkoutplan"; // Ensure correct import
import WorkoutPlanDetails from "./components/workoutdetail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const App = () => {
  return (
    <Routes>
  <Route path="/workout-plans/new" element={<UserWorkoutPlan />} />
  <Route path="/workout-plans/:planID" element={<WorkoutPlanDetails />} />
</Routes>

  );
};

export default App;
