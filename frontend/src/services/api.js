import axios from "axios";

// const API_BASE_URL = "http://localhost:5000/api";
const API_BASE_URL = process.env.REACT_APP_API_URL + "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔹 Auth API
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
};

// 🔹 Workout API
export const workoutAPI = {
  getWorkouts: () => api.get("/workouts"),
  addWorkout: (workout) => api.post("/workouts", workout),
  deleteWorkout: (id) => api.delete(`/workouts/${id}`),
};

// 🔹 Posts API (✨ added this)
export const postsAPI = {
  getPosts: () => api.get("/posts"),
  createPost: (post) => api.post("/posts", post),
};

export default api;
