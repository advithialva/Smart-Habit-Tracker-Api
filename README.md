# Smart Habit Tracker API

## Description

The **Smart Habit Tracker API** is a backend service that helps users track their daily habits, mark them as complete, and receive real-time reminders via WebSockets for any habits they haven't completed. The API allows users to set daily goals for their habits and monitor their progress on a weekly basis.

#### Key Features include:

- Add, edit, and delete habits.
- Mark habits as completed for the day.
- Receive real-time reminders via WebSockets for incomplete habits.
- View a weekly report of completed habits.

## Features

- **Add New Habits**: Add habits with a specific daily goal (e.g., drink 8 glasses of water).
- **Mark Habit as Complete**: Mark your habit as completed once you've achieved your goal for the day.
- **Real-Time Notifications**: Receive reminders if you forget to complete your daily habits.
- **Weekly Report**: View your habit completion stats for the last 7 days.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Real-Time Communication**: WebSocket
- **Task Scheduling**: `node-cron` (for future enhancements like periodic reminders)
- **API Testing**: Postman (used for API testing and requests)

## Prerequisites

To run this project locally, you need:

- [Node.js](https://nodejs.org/en/) installed on your machine.
- A text editor such as [VSCode](https://code.visualstudio.com/).
- [Postman](https://www.postman.com/) for API testing.

## API Endpoints

### 1. **POST /habits**
- **Purpose**: Create a new habit.
- **Request Body Example**:
  ```json
  {
    "name": "Read 20 pages",
    "daily_goal": 20
  }
- **Response**:
    ```json
    {
      "status": "success",
      "data": {
        "id": 1,
        "name": "Read 20 pages",
        "daily_goal": 20,
        "logs": []
      }
    }

### 2. **PUT /habits/:id**
- **Purpose**: Mark a habit as completed for today.
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "name": "Read 20 pages",
      "daily_goal": 20,
      "logs": [
        {
          "date": "2024-12-04",
          "completed": true
        }
      ]
    }
  }
  
### 3. **GET /habits**
- **Purpose**: Retrieve a list of all habits.
- **Response**:
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": 1,
        "name": "Read 20 pages",
        "daily_goal": 20,
        "logs": []
      },
      {
        "id": 2,
        "name": "Drink 8 glasses of water",
        "daily_goal": 8,
        "logs": []
      }
    ]
  }

### 4. **GET /habits/report**
- **Purpose**: Retrieve a weekly report of habit completion.
- **Response**:
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": 1,
        "name": "Read 20 pages",
        "completedDays": 3,
        "totalDays": 7
      },
      {
        "id": 2,
        "name": "Drink 8 glasses of water",
        "completedDays": 5,
        "totalDays": 7
      }
    ]
  }

## WebSocket Integration

The application integrates WebSockets to send real-time reminders if the user has not completed their habits. Every day at 9:00 AM, users will receive notifications to remind them about any incomplete habits.

     Reminder: Don't forget to complete your habit - [Habit Name]

 ### WebSocket Server

Once the WebSocket connection is established, users receive a welcome message:

    Connected to the Smart Habit Tracker!

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/smart-habit-tracker-api.git
   cd smart-habit-tracker-api

2. Install the required dependencies:

    ```bash
    npm install

3. Run the application:

    ```bash
    node index.js
  The server will start running on http://localhost:3000.
