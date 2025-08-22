import React, { useState } from 'react';

const WorkoutForm = ({ onAddWorkout }) => {
  const [workout, setWorkout] = useState({
    exercise_name: '',
    sets: '',
    reps: '',
    weight: '',
    duration: ''
  });

  // Comprehensive list of exercises organized by category
  const exerciseOptions = [
    // Chest
    'Push-ups', 'Bench Press', 'Incline Bench Press', 'Decline Bench Press', 
    'Dumbbell Flyes', 'Chest Dips', 'Cable Crossover',
    
    // Back
    'Pull-ups', 'Chin-ups', 'Lat Pulldown', 'Seated Cable Row', 'Bent-over Row',
    'Deadlift', 'T-Bar Row', 'Face Pulls', 'Shrugs',
    
    // Shoulders
    'Shoulder Press', 'Lateral Raises', 'Front Raises', 'Rear Delt Flyes',
    'Upright Row', 'Arnold Press', 'Pike Push-ups',
    
    // Arms
    'Bicep Curls', 'Hammer Curls', 'Tricep Dips', 'Tricep Extensions', 
    'Close-grip Push-ups', 'Preacher Curls', 'Skull Crushers',
    
    // Legs
    'Squats', 'Lunges', 'Leg Press', 'Leg Curls', 'Leg Extensions',
    'Calf Raises', 'Bulgarian Split Squats', 'Romanian Deadlift', 'Hip Thrusts',
    
    // Core
    'Plank', 'Crunches', 'Russian Twists', 'Mountain Climbers', 'Bicycle Crunches',
    'Dead Bug', 'Hollow Hold', 'Hanging Leg Raises',
    
    // Cardio
    'Running', 'Cycling', 'Swimming', 'Rowing', 'Elliptical', 'Jump Rope',
    'Burpees', 'High Knees', 'Jumping Jacks',
    
    // Full Body
    'Burpees', 'Thrusters', 'Clean and Press', 'Turkish Get-ups', 'Man Makers'
  ];

  const handleChange = (e) => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddWorkout(workout);
    setWorkout({
      exercise_name: '',
      sets: '',
      reps: '',
      weight: '',
      duration: ''
    });
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
      <h3>Add New Workout</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px', marginBottom: '15px' }}>
          <select
            name="exercise_name"
            value={workout.exercise_name}
            onChange={handleChange}
            required
            style={{ 
              padding: '8px', 
              border: '1px solid #ddd', 
              borderRadius: '4px',
              backgroundColor: 'white',
              fontSize: '14px'
            }}
          >
            <option value="">Select Exercise</option>
            {exerciseOptions.sort().map((exercise, index) => (
              <option key={index} value={exercise}>
                {exercise}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="sets"
            placeholder="Sets"
            value={workout.sets}
            onChange={handleChange}
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '15px' }}>
          <input
            type="number"
            name="reps"
            placeholder="Reps"
            value={workout.reps}
            onChange={handleChange}
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <input
            type="number"
            step="0.1"
            name="weight"
            placeholder="Weight (kg)"
            value={workout.weight}
            onChange={handleChange}
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <input
            type="number"
            name="duration"
            placeholder="Duration (min)"
            value={workout.duration}
            onChange={handleChange}
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </div>
        
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Workout
        </button>
      </form>
    </div>
  );
};

export default WorkoutForm;