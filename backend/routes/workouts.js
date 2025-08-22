const express = require('express');
const db = require('../database');
const { authenticateToken } = require('../auth');

const router = express.Router();

// Get all workouts for authenticated user
router.get('/', authenticateToken, (req, res) => {
  db.all(
    'SELECT * FROM workouts WHERE user_id = ? ORDER BY created_at DESC',
    [req.user.id],
    (err, workouts) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(workouts);
    }
  );
});

// Add new workout
router.post('/', authenticateToken, (req, res) => {
  const { exercise_name, sets, reps, weight, duration } = req.body;

  if (!exercise_name) {
    return res.status(400).json({ error: 'Exercise name is required' });
  }

  db.run(
    'INSERT INTO workouts (user_id, exercise_name, sets, reps, weight, duration) VALUES (?, ?, ?, ?, ?, ?)',
    [req.user.id, exercise_name, sets, reps, weight, duration],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({
        message: 'Workout added successfully',
        workout: { id: this.lastID, exercise_name, sets, reps, weight, duration }
      });
    }
  );
});

// Delete workout
router.delete('/:id', authenticateToken, (req, res) => {
  const workoutId = req.params.id;

  db.run(
    'DELETE FROM workouts WHERE id = ? AND user_id = ?',
    [workoutId, req.user.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Workout not found' });
      }
      res.json({ message: 'Workout deleted successfully' });
    }
  );
});

module.exports = router;