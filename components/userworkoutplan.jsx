import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';



const UserWorkoutPlan = () => {
  const initialPlan = {
    userID: '',
    fitnessLevel: '',
    duration: '',
    weeklyGoal: ''
  };
  const [plan, setPlan] = useState(initialPlan);
  const [editMode, setEditMode] = useState(true);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlan({ ...plan, [name]: value });
  };

  const handleSavePlan = async () => {
    try {
      const response = await axios.post('/api/userworkoutplans', {
        userID: plan.userID,
        fitnessLevel: plan.fitnessLevel,
        duration: plan.duration,
        weeklyGoal: plan.weeklyGoal
      });
      if (response.status === 201) {
        alert('Workout plan saved successfully!');
        history.push(`/workout-plans/${response.data.planID}`);
      }
    } catch (error) {
      console.error('Failed to save workout plan:', error);
      alert('Failed to save workout plan. Please try again.');
    }
  };

  return (
    <div style={styles.outerContainer}>
      <h1 style={styles.headerLabel}>IntelliHealth Application</h1>
      <div style={styles.container}>
        <h2 style={styles.header}>Workout Plan</h2>
        <div style={styles.field}>
          <label style={styles.label}>User ID: </label>
          <input
            type="text"
            name="userID"
            value={plan.userID}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter User ID"
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Fitness Level: </label>
          {editMode ? (
            <select
              name="fitnessLevel"
              value={plan.fitnessLevel}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Select</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          ) : (
            <span style={styles.text}>{plan.fitnessLevel || 'Not set'}</span>
          )}
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Duration (weeks): </label>
          {editMode ? (
            <input
              type="number"
              name="duration"
              value={plan.duration}
              onChange={handleChange}
              style={styles.input}
            />
          ) : (
            <span style={styles.text}>{plan.duration ? `${plan.duration} weeks` : 'Not set'}</span>
          )}
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Weekly Goal: </label>
          {editMode ? (
            <input
              type="text"
              name="weeklyGoal"
              value={plan.weeklyGoal}
              onChange={handleChange}
              style={styles.input}
            />
          ) : (
            <span style={styles.text}>{plan.weeklyGoal || 'Not set'}</span>
          )}
        </div>
        <div style={styles.buttonContainer}>
          {editMode ? (
            <button onClick={handleSavePlan} style={styles.button}>
              Save Plan
            </button>
          ) : (
            <button onClick={() => setEditMode(true)} style={styles.button}>
              Edit Plan
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  outerContainer: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  headerLabel: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px'
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  },
  field: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: '20px'
  }
};

export default UserWorkoutPlan;
