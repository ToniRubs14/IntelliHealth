import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const WorkoutPlanDetails = () => {
  const { planID } = useParams(); // Get planID from route parameters
  const [plan, setPlan] = useState({
    userID: '',
    fitnessLevel: '',
    duration: '',
    weeklyGoal: ''
  });
  const [editMode, setEditMode] = useState(false);

  // Fetch workout plan details on component mount
  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      try {
        const response = await axios.get(`/api/workoutplans/${planID}`);
        setPlan(response.data);
      } catch (error) {
        console.error('Failed to fetch workout plan:', error);
      }
    };

    fetchWorkoutPlan();
  }, [planID]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlan({ ...plan, [name]: value });
  };

  // Handle save plan function
  const handleSavePlan = async () => {
    try {
      const response = await axios.put(`/api/workoutplans/${planID}`, {
        userID: plan.userID,
        fitnessLevel: plan.fitnessLevel,
        duration: plan.duration,
        weeklyGoal: plan.weeklyGoal
      });
      if (response.status === 200) {
        alert('Workout plan updated successfully!');
        setEditMode(false); // Disable edit mode
      }
    } catch (error) {
      console.error('Failed to update workout plan:', error.response?.data || error.message);
      alert('Failed to update workout plan. Please try again.');
    }
  };

  // Handle delete plan
  const handleDeletePlan = async () => {
    try {
      await axios.delete(`/api/workoutplans/${planID}`);
      alert('Workout plan deleted successfully!');
      // Optionally redirect to another page or clear the details
    } catch (error) {
      console.error('Failed to delete workout plan:', error);
      alert('Failed to delete workout plan. Please try again.');
    }
  };

  return (
    <div>
      <h2>Workout Plan Details</h2>
      <div>
        <label>User ID: </label>
        {editMode ? (
          <input
            type="text"
            name="userID"
            value={plan.userID}
            onChange={handleChange}
          />
        ) : (
          <span>{plan.userID}</span>
        )}
      </div>
      <div>
        <label>Fitness Level: </label>
        {editMode ? (
          <select
            name="fitnessLevel"
            value={plan.fitnessLevel}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        ) : (
          <span>{plan.fitnessLevel}</span>
        )}
      </div>
      <div>
        <label>Duration (weeks): </label>
        {editMode ? (
          <input
            type="number"
            name="duration"
            value={plan.duration}
            onChange={handleChange}
          />
        ) : (
          <span>{plan.duration}</span>
        )}
      </div>
      <div>
        <label>Weekly Goal: </label>
        {editMode ? (
          <input
            type="text"
            name="weeklyGoal"
            value={plan.weeklyGoal}
            onChange={handleChange}
          />
        ) : (
          <span>{plan.weeklyGoal}</span>
        )}
      </div>
      <button onClick={editMode ? handleSavePlan : () => setEditMode(true)}>
        {editMode ? 'Save Plan' : 'Edit Plan'}
      </button>
      <button onClick={handleDeletePlan}>Delete Plan</button>
    </div>
  );
};

export default WorkoutPlanDetails;
