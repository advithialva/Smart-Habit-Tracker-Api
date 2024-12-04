const express = require('express');
const WebSocket = require('ws');
const cron = require('node-cron');

const app = express();
const PORT = 3000;

// Middleware (replacing body-parser with built-in express.json())
app.use(express.json());

// In-memory habit storage
let habits = [];
let nextId = 1;

// WebSocket setup
const wss = new WebSocket.Server({ noServer: true });

// Broadcast message to all connected clients
const broadcast = (message) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

// API Endpoints

// Add Habit
app.post('/habits', (req, res) => {
    console.log("Request received:", req.body); // Log the request body
    const { name, daily_goal } = req.body;
  
    if (!name || !daily_goal || typeof daily_goal !== 'number') {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid input. "name" and numeric "daily_goal" are required.',
      });
    }
  
    const newHabit = {
      id: nextId++,
      name,
      daily_goal,
      logs: [],
    };
  
    habits.push(newHabit);
  
    res.status(201).json({
      status: 'success',
      data: newHabit,
    });
  });

// Mark Habit as Complete
app.put('/habits/:id', (req, res) => {
  const { id } = req.params;
  const habit = habits.find((h) => h.id === parseInt(id));

  if (!habit) {
    return res.status(404).json({
      status: 'error',
      error: `Habit with ID ${id} not found.`,
    });
  }

  const today = new Date().toISOString().split('T')[0];
  const alreadyLogged = habit.logs.some((log) => log.date === today);

  if (alreadyLogged) {
    return res.status(400).json({
      status: 'error',
      error: `Habit with ID ${id} is already marked as complete for today.`,
    });
  }

  habit.logs.push({ date: today, completed: true });

  res.status(200).json({
    status: 'success',
    data: habit,
  });
});

// View All Habits
app.get('/habits', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: habits,
  });
});

// Weekly Report
app.get('/habits/report', (req, res) => {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));

  const report = habits.map((habit) => {
    const completedDays = habit.logs.filter((log) => {
      const logDate = new Date(log.date);
      return logDate >= startOfWeek && log.completed;
    }).length;

    return {
      id: habit.id,
      name: habit.name,
      completedDays,
      totalDays: 7,
    };
  });

  res.status(200).json({
    status: 'success',
    data: report,
  });
});

// WebSocket server integration
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Upgrade HTTP to WebSocket
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

wss.on('connection', (ws) => {
  ws.send('Connected to the Smart Habit Tracker!');

  const sendHabitReminders = () => {
    const today = new Date().toISOString().split('T')[0];

    habits.forEach((habit) => {
      const habitCompletedToday = habit.logs.some((log) => log.date === today && log.completed);

      if (!habitCompletedToday) {
        const reminderMessage = `Reminder: Don't forget to complete your habit - ${habit.name}`;
        broadcast(reminderMessage); // Broadcast to all WebSocket clients
      }
    });
  };

  // Schedule daily reminder at 9 AM
  cron.schedule('0 9 * * *', sendHabitReminders); 
});
