# TaskFlow – React Task Management Application

TaskFlow is a responsive task management application built with React and Vite. It allows users to create, view, update, search, filter, and delete tasks through a REST API connected to a MongoDB database.

This project was developed as part of the **Codveda Technologies Full-Stack Development Internship – Level 2, Task 1**.

## Features

- Create new tasks.
- View tasks retrieved from the backend.
- Mark tasks as completed or undo completion.
- Delete tasks.
- Search tasks by title.
- Filter tasks by All, Pending, and Completed.
- Loading indicators during API operations.
- Error handling with a retry option.
- Success messages after successful operations.
- Input validation to prevent empty task titles.
- Responsive design for desktop and mobile devices.
- Persistent task storage through MongoDB.

## Technologies Used

**Frontend**

- React.js
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3
- Fetch API
- React Hooks (`useState`, `useEffect`)

**Backend**

- Node.js
- Express.js
- MongoDB

## Project Structure

```text
codveda-react-frontend/
│
├── public/
├── src/
│   ├── components/
│   │   ├── TaskForm.jsx
│   │   ├── TaskItem.jsx
│   │   └── TaskList.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/EleniGebremedhin/codveda-react-frontend.git
```

### 2. Navigate to the project directory

```bash
cd codveda-react-frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the backend server

Clone and configure the backend repository separately:

https://github.com/EleniGebremedhin/codveda-rest-api

Follow its setup instructions and ensure MongoDB is connected.

Start the backend:

```bash
node server.js
```

The backend runs at:

```text
http://localhost:3000
```

### 5. Start the React frontend

Open another terminal in the React project directory and run:

```bash
npm run dev
```

Open the local development URL displayed in your terminal, usually:

```text
http://localhost:5173
```

**Important:** Keep both the backend and frontend servers running while using the application.

## API Integration

The React application communicates with the Express backend using the Fetch API.

| HTTP Method | Operation      | Endpoint     |
| ----------- | -------------- | ------------ |
| GET         | Retrieve tasks | `/tasks`     |
| POST        | Create a task  | `/tasks`     |
| PUT         | Update a task  | `/tasks/:id` |
| DELETE      | Delete a task  | `/tasks/:id` |

The backend handles database operations and stores task information in MongoDB.

## Reusable React Components

- **TaskForm:** Handles task input and submission.
- **TaskItem:** Displays an individual task and its actions.
- **TaskList:** Displays the collection of tasks.

## GitHub Repository

Frontend: https://github.com/EleniGebremedhin/codveda-react-frontend

Backend: https://github.com/EleniGebremedhin/codveda-rest-api

## Internship Information

**Organization:** Codveda Technologies

**Domain:** Full-Stack Development

**Level:** Level 2 – Intermediate

**Task:** Task 1 – Frontend with a JavaScript Framework (React)

---

Developed as part of my journey in learning and building full-stack web applications.
