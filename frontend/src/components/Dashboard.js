// import React, { useState, useEffect } from "react";
// import { workoutAPI } from "../services/api";
// import WorkoutForm from "./WorkoutForm";
// import backgroundImg from "../assets/background.avif";
// import ExerciseLibrary from "./ExerciseLibrary";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   Legend,
// } from "recharts"; // for progress tracking charts

// const Dashboard = ({ user, onLogout }) => {
//   const [workouts, setWorkouts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [filter, setFilter] = useState(""); // filter workouts by type/muscle
//   const [progressData, setProgressData] = useState([]); // for charts
//   const [showSection, setShowSection] = useState("workouts"); // toggle between sections

//   // NEW: states for workout plans
//   const [planName, setPlanName] = useState("");
//   const [exerciseInput, setExerciseInput] = useState("");
//   const [currentExercises, setCurrentExercises] = useState([]);
//   const [savedPlans, setSavedPlans] = useState([]);

//   // Nutrition Section
//   const [nutritionData, setNutritionData] = useState([]);
//   const [foodInput, setFoodInput] = useState("");
//   const [caloriesInput, setCaloriesInput] = useState("");


//   useEffect(() => {
//     fetchWorkouts();
//   }, []);

//   const fetchWorkouts = async () => {
//     setLoading(true);
//     try {
//       const response = await workoutAPI.getWorkouts();
//       setWorkouts(response.data);
//       // Example: generate progress data (like weight tracking)
//       setProgressData(
//         response.data.map((w) => ({
//           date: new Date(w.created_at).toLocaleDateString(),
//           weight: w.weight || 0,
//         }))
//       );
//     } catch (error) {
//       console.error("Error fetching workouts:", error);
//     }
//     setLoading(false);
//   };

//   const handleAddWorkout = async (workout) => {
//     try {
//       await workoutAPI.addWorkout(workout);
//       fetchWorkouts();
//     } catch (error) {
//       console.error("Error adding workout:", error);
//     }
//   };

//   const handleDeleteWorkout = async (id) => {
//     try {
//       await workoutAPI.deleteWorkout(id);
//       setWorkouts(workouts.filter((w) => w.id !== id));
//     } catch (error) {
//       console.error("Error deleting workout:", error);
//     }
//   };

//   // Filter workouts
//   const filteredWorkouts = workouts.filter((w) =>
//     filter ? w.exercise_name.toLowerCase().includes(filter.toLowerCase()) : true
//   );

//   // NEW: Plan functions
//   const addExerciseToPlan = () => {
//     if (exerciseInput.trim() !== "") {
//       setCurrentExercises([...currentExercises, exerciseInput.trim()]);
//       setExerciseInput("");
//     }
//   };

//   const savePlan = () => {
//     if (planName.trim() !== "" && currentExercises.length > 0) {
//       setSavedPlans([
//         ...savedPlans,
//         { name: planName, exercises: currentExercises },
//       ]);
//       setPlanName("");
//       setCurrentExercises([]);
//     }
//   };

//   const deletePlan = (index) => {
//     const updatedPlans = savedPlans.filter((_, idx) => idx !== index);
//     setSavedPlans(updatedPlans);
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         backgroundImage: `url(${backgroundImg})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//         padding: "20px",
//       }}
//     >
//       <div
//         style={{
//           maxWidth: "900px",
//           margin: "0 auto",
//           padding: "20px",
//           backgroundColor: "rgba(255, 255, 255, 0.9)",
//           borderRadius: "12px",
//           boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
//         }}
//       >
//         {/* Header */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "30px",
//           }}
//         >
//           <div>
//             <h1>Fitness Tracker</h1>
//             <p>Welcome, {user.username}!</p>
//           </div>
//           <button
//             onClick={onLogout}
//             style={{
//               padding: "8px 16px",
//               backgroundColor: "#dc3545",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             Logout
//           </button>
//         </div>

//         {/* Section Navigation */}
//         <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
//           {["workouts", "progress", "library", "plans", "social"].map(
//             (section) => (
//               <button
//                 key={section}
//                 onClick={() => setShowSection(section)}
//                 style={{
//                   padding: "6px 12px",
//                   borderRadius: "6px",
//                   border: "1px solid #ccc",
//                   backgroundColor:
//                     showSection === section ? "#007bff" : "#f8f9fa",
//                   color: showSection === section ? "white" : "black",
//                   cursor: "pointer",
//                 }}
//               >
//                 {section.charAt(0).toUpperCase() + section.slice(1)}
//               </button>
//             )
//           )}
//         </div>

//         {/* Workouts Section */}
//         {showSection === "workouts" && (
//           <>
//             <WorkoutForm onAddWorkout={handleAddWorkout} />

//             <div>
//               <h3>Your Workouts</h3>
//               <input
//                 type="text"
//                 placeholder="Filter workouts..."
//                 value={filter}
//                 onChange={(e) => setFilter(e.target.value)}
//                 style={{ marginBottom: "10px", padding: "6px", width: "100%" }}
//               />

//               {loading ? (
//                 <p>Loading workouts...</p>
//               ) : filteredWorkouts.length === 0 ? (
//                 <p>No workouts found. Add your first workout!</p>
//               ) : (
//                 <div style={{ display: "grid", gap: "15px" }}>
//                   {filteredWorkouts.map((workout) => (
//                     <div
//                       key={workout.id}
//                       style={{
//                         border: "1px solid #ddd",
//                         borderRadius: "8px",
//                         padding: "15px",
//                         backgroundColor: "white",
//                       }}
//                     >
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "flex-start",
//                         }}
//                       >
//                         <div>
//                           <h4>{workout.exercise_name}</h4>
//                           <div
//                             style={{
//                               display: "flex",
//                               gap: "15px",
//                               fontSize: "14px",
//                               color: "#666",
//                             }}
//                           >
//                             {workout.sets && <span>Sets: {workout.sets}</span>}
//                             {workout.reps && <span>Reps: {workout.reps}</span>}
//                             {workout.weight && (
//                               <span>Weight: {workout.weight}kg</span>
//                             )}
//                             {workout.duration && (
//                               <span>Duration: {workout.duration}min</span>
//                             )}
//                           </div>
//                           <p
//                             style={{
//                               margin: "8px 0 0 0",
//                               fontSize: "12px",
//                               color: "#999",
//                             }}
//                           >
//                             {new Date(workout.created_at).toLocaleDateString()}
//                           </p>
//                         </div>
//                         <button
//                           onClick={() => handleDeleteWorkout(workout.id)}
//                           style={{
//                             padding: "5px 10px",
//                             backgroundColor: "#dc3545",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "4px",
//                             cursor: "pointer",
//                           }}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </>
//         )}

//         {/* Progress Section */}
//         {showSection === "progress" && (
//           <div>
//             <h3>Progress Tracking</h3>
//             <LineChart width={800} height={300} data={progressData}>
//               <CartesianGrid stroke="#ccc" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="weight" stroke="#007bff" />
//             </LineChart>
//           </div>
//         )}

//         {/* Exercise Library */}
//         {showSection === "library" && <ExerciseLibrary />}

//         {/* Workout Plans */}
//         {showSection === "plans" && (
//           <div>
//             <h3>Workout Plans & Scheduling</h3>
//             <p>Create and save workout routines.</p>

//             {/* Plan Creation Form */}
//             <div style={{ marginBottom: "15px" }}>
//               <input
//                 type="text"
//                 placeholder="Plan Name"
//                 value={planName}
//                 onChange={(e) => setPlanName(e.target.value)}
//                 style={{ padding: "6px", marginRight: "8px" }}
//               />
//               <input
//                 type="text"
//                 placeholder="Exercise (e.g. Push Ups)"
//                 value={exerciseInput}
//                 onChange={(e) => setExerciseInput(e.target.value)}
//                 style={{ padding: "6px", marginRight: "8px" }}
//               />
//               <button
//                 onClick={addExerciseToPlan}
//                 style={{
//                   padding: "6px 12px",
//                   backgroundColor: "#007bff",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "4px",
//                 }}
//               >
//                 Add Exercise
//               </button>
//             </div>

//             {/* Current Plan Preview */}
//             {currentExercises.length > 0 && (
//               <div style={{ marginBottom: "15px" }}>
//                 <h4>Current Exercises:</h4>
//                 <ul>
//                   {currentExercises.map((ex, idx) => (
//                     <li key={idx}>{ex}</li>
//                   ))}
//                 </ul>
//                 <button
//                   onClick={savePlan}
//                   style={{
//                     padding: "6px 12px",
//                     backgroundColor: "#28a745",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "4px",
//                   }}
//                 >
//                   Save Plan
//                 </button>
//               </div>
//             )}

//             {/* Saved Plans */}
//             <div>
//               <h4>Saved Workout Plans</h4>
//               {savedPlans.length === 0 ? (
//                 <p>No plans created yet.</p>
//               ) : (
//                 <ul>
//                   {savedPlans.map((plan, idx) => (
//                     <li key={idx} style={{ marginBottom: "10px" }}>
//                       <strong>{plan.name}</strong>
//                       <ul>
//                         {plan.exercises.map((ex, i) => (
//                           <li key={i}>{ex}</li>
//                         ))}
//                       </ul>
//                       <button
//                         onClick={() => deletePlan(idx)}
//                         style={{
//                           color: "red",
//                           background: "none",
//                           border: "none",
//                           cursor: "pointer",
//                         }}
//                       >
//                         Delete
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Social Section */}
//         {showSection === "social" && (
//           <div style={{ padding: "20px" }}>
//             <h3>Social Features</h3>
//             <p>
//               Share workouts, like/comment on friends’ progress, and join
//               challenges.
//             </p>

//             {/* Example Posts */}
//             <div style={{ marginTop: "20px" }}>
//               <div
//                 style={{
//                   border: "1px solid #ccc",
//                   borderRadius: "8px",
//                   padding: "15px",
//                   marginBottom: "15px",
//                 }}
//               >
//                 <strong>Priyanshi Yadav</strong>
//                 <p>🏋️‍♂️ Just finished a killer leg day workout! 💪🔥</p>
//                 <button style={{ marginRight: "10px" }}>👍 Like</button>
//                 <button>💬 Comment</button>
//               </div>

//               <div
//                 style={{
//                   border: "1px solid #ccc",
//                   borderRadius: "8px",
//                   padding: "15px",
//                   marginBottom: "15px",
//                 }}
//               >
//                 <strong>Pooja Yadav</strong>
//                 <p>
//                   🥗 Staying consistent with diet + workout = best results! 🙌
//                 </p>
//                 <button style={{ marginRight: "10px" }}>👍 Like</button>
//                 <button>💬 Comment</button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from "react";
import { workoutAPI } from "../services/api";
import WorkoutForm from "./WorkoutForm";
import backgroundImg from "../assets/background.avif";
import ExerciseLibrary from "./ExerciseLibrary";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

const Dashboard = ({ user, onLogout }) => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [progressData, setProgressData] = useState([]);
  const [showSection, setShowSection] = useState("workouts");

  // Workout Plans
  const [planName, setPlanName] = useState("");
  const [exerciseInput, setExerciseInput] = useState("");
  const [currentExercises, setCurrentExercises] = useState([]);
  const [savedPlans, setSavedPlans] = useState([]);

  // Nutrition Section
  const foodOptions = [
  { name: "Apple", calories: 52 },
  { name: "Banana", calories: 89 },
  { name: "Chicken Breast", calories: 165 },
  { name: "Rice (100g)", calories: 130 },
  { name: "Broccoli", calories: 55 },
  { name: "Egg (1 large)", calories: 78 },
  { name: "Milk (1 cup)", calories: 103 },
  { name: "Almonds (10 pcs)", calories: 70 },
  // add more as needed
];

  const [nutritionData, setNutritionData] = useState([]);
  const [foodInput, setFoodInput] = useState("");
  const [caloriesInput, setCaloriesInput] = useState("");

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    setLoading(true);
    try {
      const response = await workoutAPI.getWorkouts();
      setWorkouts(response.data);
      setProgressData(
        response.data.map((w) => ({
          date: new Date(w.created_at).toLocaleDateString(),
          weight: w.weight || 0,
        }))
      );
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
    setLoading(false);
  };

  const handleAddWorkout = async (workout) => {
    try {
      await workoutAPI.addWorkout(workout);
      fetchWorkouts();
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  };

  const handleDeleteWorkout = async (id) => {
    try {
      await workoutAPI.deleteWorkout(id);
      setWorkouts(workouts.filter((w) => w.id !== id));
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  const filteredWorkouts = workouts.filter((w) =>
    filter ? w.exercise_name.toLowerCase().includes(filter.toLowerCase()) : true
  );

  // Workout Plans Functions
  const addExerciseToPlan = () => {
    if (exerciseInput.trim() !== "") {
      setCurrentExercises([...currentExercises, exerciseInput.trim()]);
      setExerciseInput("");
    }
  };

  const savePlan = () => {
    if (planName.trim() !== "" && currentExercises.length > 0) {
      setSavedPlans([...savedPlans, { name: planName, exercises: currentExercises }]);
      setPlanName("");
      setCurrentExercises([]);
    }
  };

  const deletePlan = (index) => {
    setSavedPlans(savedPlans.filter((_, idx) => idx !== index));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <div>
            <h1>Fitness Tracker</h1>
            <p>Welcome, {user.username}!</p>
          </div>
          <button
            onClick={onLogout}
            style={{
              padding: "8px 16px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>

        {/* Section Navigation */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          {["workouts", "progress", "library", "plans", "social", "nutrition"].map(
            (section) => (
              <button
                key={section}
                onClick={() => setShowSection(section)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  backgroundColor: showSection === section ? "#007bff" : "#f8f9fa",
                  color: showSection === section ? "white" : "black",
                  cursor: "pointer",
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            )
          )}
        </div>

        {/* Workouts Section */}
        {showSection === "workouts" && (
          <>
            <WorkoutForm onAddWorkout={handleAddWorkout} />
            <div>
              <h3>Your Workouts</h3>
              <input
                type="text"
                placeholder="Filter workouts..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{ marginBottom: "10px", padding: "6px", width: "100%" }}
              />
              {loading ? (
                <p>Loading workouts...</p>
              ) : filteredWorkouts.length === 0 ? (
                <p>No workouts found. Add your first workout!</p>
              ) : (
                <div style={{ display: "grid", gap: "15px" }}>
                  {filteredWorkouts.map((workout) => (
                    <div
                      key={workout.id}
                      style={{
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "15px",
                        backgroundColor: "white",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <div>
                          <h4>{workout.exercise_name}</h4>
                          <div
                            style={{
                              display: "flex",
                              gap: "15px",
                              fontSize: "14px",
                              color: "#666",
                            }}
                          >
                            {workout.sets && <span>Sets: {workout.sets}</span>}
                            {workout.reps && <span>Reps: {workout.reps}</span>}
                            {workout.weight && <span>Weight: {workout.weight}kg</span>}
                            {workout.duration && <span>Duration: {workout.duration}min</span>}
                          </div>
                          <p style={{ margin: "8px 0 0 0", fontSize: "12px", color: "#999" }}>
                            {new Date(workout.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteWorkout(workout.id)}
                          style={{
                            padding: "5px 10px",
                            backgroundColor: "#dc3545",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Progress Section */}
        {showSection === "progress" && (
          <div>
            <h3>Progress Tracking</h3>
            <LineChart width={800} height={300} data={progressData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="weight" stroke="#007bff" />
            </LineChart>
          </div>
        )}

        {/* Exercise Library */}
        {showSection === "library" && <ExerciseLibrary />}

        {/* Workout Plans */}
        {showSection === "plans" && (
          <div>
            <h3>Workout Plans & Scheduling</h3>
            <p>Create and save workout routines.</p>
            <div style={{ marginBottom: "15px" }}>
              <input
                type="text"
                placeholder="Plan Name"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                style={{ padding: "6px", marginRight: "8px" }}
              />
              <input
                type="text"
                placeholder="Exercise (e.g. Push Ups)"
                value={exerciseInput}
                onChange={(e) => setExerciseInput(e.target.value)}
                style={{ padding: "6px", marginRight: "8px" }}
              />
              <button
                onClick={addExerciseToPlan}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Add Exercise
              </button>
            </div>
            {currentExercises.length > 0 && (
              <div style={{ marginBottom: "15px" }}>
                <h4>Current Exercises:</h4>
                <ul>
                  {currentExercises.map((ex, idx) => (
                    <li key={idx}>{ex}</li>
                  ))}
                </ul>
                <button
                  onClick={savePlan}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                  }}
                >
                  Save Plan
                </button>
              </div>
            )}
            <div>
              <h4>Saved Workout Plans</h4>
              {savedPlans.length === 0 ? (
                <p>No plans created yet.</p>
              ) : (
                <ul>
                  {savedPlans.map((plan, idx) => (
                    <li key={idx} style={{ marginBottom: "10px" }}>
                      <strong>{plan.name}</strong>
                      <ul>
                        {plan.exercises.map((ex, i) => (
                          <li key={i}>{ex}</li>
                        ))}
                      </ul>
                      <button
                        onClick={() => deletePlan(idx)}
                        style={{
                          color: "red",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Social Section */}
        {showSection === "social" && (
          <div style={{ padding: "20px" }}>
            <h3>Social Features</h3>
            <p>Share workouts, like/comment on friends’ progress, and join challenges.</p>
            <div style={{ marginTop: "20px" }}>
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "15px",
                  marginBottom: "15px",
                }}
              >
                <strong>Priyanshi Yadav</strong>
                <p>🏋️‍♂️ Just finished a killer leg day workout! 💪🔥</p>
                <button style={{ marginRight: "10px" }}>👍 Like</button>
                <button>💬 Comment</button>
              </div>
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "15px",
                  marginBottom: "15px",
                }}
              >
                <strong>Pooja Yadav</strong>
                <p>🥗 Staying consistent with diet + workout = best results! 🙌</p>
                <button style={{ marginRight: "10px" }}>👍 Like</button>
                <button>💬 Comment</button>
              </div>
            </div>
          </div>
        )}

        {/* Nutrition Section */}
        {showSection === "nutrition" && (
          <div>
            <h3>Nutrition Tracker</h3>
            <p>Track your meals and calories.</p>

            {/* Add Food Form */}
          <div style={{ marginBottom: "15px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
  <select
    value={foodInput}
    onChange={(e) => setFoodInput(e.target.value)}
    style={{ padding: "6px" }}
  >
    <option value="">Select Food</option>
    {foodOptions.map((food, idx) => (
      <option key={idx} value={food.name}>
        {food.name}
      </option>
    ))}
  </select>
  
  <input
    type="number"
    placeholder="Calories"
    value={caloriesInput}
    onChange={(e) => setCaloriesInput(e.target.value)}
    style={{ padding: "6px" }}
  />
  
  <button
    onClick={() => {
      if (foodInput && caloriesInput) {
        setNutritionData([
          ...nutritionData,
          { name: foodInput, value: parseInt(caloriesInput) },
        ]);
        setFoodInput("");
        setCaloriesInput("");
      }
    }}
    style={{
      padding: "6px 12px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "4px",
    }}
  >
    Add Food
  </button>
</div>


            {/* Food List */}
            {nutritionData.length === 0 ? (
              <p>No food entries yet.</p>
            ) : (
              <>
                <ul>
                  {nutritionData.map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span>
                        {item.name} — {item.value} kcal
                      </span>
                      <button
                        onClick={() =>
                          setNutritionData(nutritionData.filter((_, i) => i !== idx))
                        }
                        style={{
                          color: "red",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          marginLeft: "10px",
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>


                {/* PieChart */}
                <h4>Calorie Distribution</h4>
                <PieChart width={400} height={400}>
                  <Pie
                    data={nutritionData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    label
                  >
                    {nutritionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </>
            )}

            {/* Diet Guidance Panel */}
            <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
              <h4>Diet Guidance</h4>
              <ul>
                <li>🥗 Include more vegetables and fruits daily.</li>
                <li>🍗 Prioritize lean proteins for muscle recovery.</li>
                <li>💧 Stay hydrated: drink at least 2L water/day.</li>
                <li>🥛 Include calcium-rich foods like milk, yogurt, or cheese.</li>
                <li>⚖️ Balance calories with your daily activity level.</li>
              </ul>
              <p style={{ fontStyle: "italic", color: "#555" }}>Tip: Log your meals consistently to track your nutrition effectively.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
