# Smart Habit Tracker

## Description

The **Smart Habit Tracker** is a web application designed to help users track their daily habits, mark them as complete, and receive real-time reminders via WebSockets for any habits they haven't completed yet. This application allows users to set goals for daily habits and view their weekly progress.

Key Features include:

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
- - [Postman] for testing the API.

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/smart-habit-tracker.git
   cd smart-habit-tracker

2. Install the required dependencies:

    ```bash
    npm install

3. Run the application:

    ```bash
    node index.js
  The server will start running on http://localhost:3000.
