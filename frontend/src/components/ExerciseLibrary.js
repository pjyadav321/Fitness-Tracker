
import React, { useState } from "react";

const exercises = [
  { 
    id: 1, 
    name: "Push-Up", 
    description: "A bodyweight exercise that strengthens the chest, shoulders, triceps, and core. Performed by lowering and raising your body using your arms while keeping a straight posture. Great for building upper body strength and improving endurance.",
    image: "https://fitnessfaqs.com/wp-content/uploads/2023/12/Normal-Push-ups.gif"
  },
  { 
    id: 2, 
    name: "Squat", 
    description: "A fundamental lower-body exercise that strengthens the quadriceps, hamstrings, glutes, and core. Squats improve balance, mobility, and overall leg power, making them essential for daily movement and athletic performance.",
    image: "https://media2.giphy.com/media/v1.Y2lkPTZjMDliOTUydzFleHQwenlvZzI1emdwNTdjbWVqNjNzbDJhMzNxd3Fia2Y5cHdhcCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/d832ZmpAR76kng271x/giphy-downsized.gif"
  },
  { 
    id: 3, 
    name: "Plank", 
    description: "An isometric core exercise that strengthens the abdominal muscles, back, and shoulders while improving posture and stability. It also engages the glutes and legs for full-body endurance. Ideal for enhancing core strength and preventing injuries.",
    image: "https://i.pinimg.com/originals/71/39/d1/7139d152892319a5f61b64bab693c685.gif"
  },
  { 
    id: 4, 
    name: "Burpees", 
    description: "A high-intensity full-body exercise that combines a squat, push-up, and jump. Burpees build strength, endurance, and cardiovascular fitness while targeting the chest, arms, legs, and core. They are effective for burning calories and improving overall fitness.",
    image: "https://i0.wp.com/joshuaspodek.com/wp-content/uploads/2016/07/burpee.gif?resize=640%2C425&ssl=1"
  },
  { 
    id: 5, 
    name: "Sit-Up", 
    description: "A classic abdominal exercise that strengthens the core by repeatedly lifting the torso from the floor to a sitting position. Sit-ups mainly target the rectus abdominis (six-pack muscles) and also engage the hip flexors and obliques. They are effective for building core strength and improving posture.",
    image: "https://burnfit.io/wp-content/uploads/2023/11/SIT_UP.gif"
  },
  { 
    id: 6, 
    name: "Pull-Up", 
    description: "A compound upper-body exercise performed by hanging from a bar and pulling the body upward until the chin passes the bar. Pull-ups primarily target the latissimus dorsi (back muscles), biceps, shoulders, and core. They are excellent for building upper body strength and improving grip strength.",
    image: "https://media.giphy.com/media/jVZFKDqkbxDEkbfGUA/giphy.gif"
  },

  
];

function ExerciseLibrary() {
  const [search, setSearch] = useState("");

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h3>Exercise Library</h3>
      <input
        type="text"
        placeholder="Search exercises..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", 
        gap: "40px" 
      }}>
        {filteredExercises.map((exercise) => (
          <div 
            key={exercise.id} 
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
            }}
          >
            <img 
              src={exercise.image} 
              alt={exercise.name} 
              style={{ 
                width: "80%", 
                height: "150px", 
                objectFit: "cover", 
                borderRadius: "8px" 
              }} 
            />
            <h4 style={{ margin: "10px 0 5px" }}>{exercise.name}</h4>
            <p style={{ color: "#555", fontSize: "14px" }}>{exercise.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExerciseLibrary;
