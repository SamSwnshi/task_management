# Task Management Application

A full-stack task management application that allows users to authenticate, create, update, and delete tasks, as well as filter tasks by different categories. The application consists of a backend built with Node.js and a frontend built with React.

## Features

User authentication (sign up and login)

Task management (create, read, update, delete tasks)

Task filtering by different categories

Responsive UI

Secure API communication with JWT authentication

## Tech Stack
### Backend
 Node.js - JavaScript runtime for server-side scripting.

 Express.js - Web framework for building the API.

 MongoDB - Database for storing user and task data.

Mongoose - ODM for interacting with MongoDB.

JWT (JSON Web Token) - For user authentication.

 Bcrypt - For password hashing.

### Frontend
React - JavaScript library for building the user interface.

Vite - Build tool for fast development.

Tailwind CSS - For utility-first styling.

Axios - For making HTTP requests.

React Router - For navigation.

### Directory Structure

Edit
```
└── samswnshi-task_management/
    ├── backend/
    │   ├── index.js                  
    │   ├── package-lock.json         
    │   ├── package.json             
    │   ├── .gitignore              
    │   ├── controllers/              
    │   │   ├── task.controller.js   
    │   │   └── user.controller.js    
    │   ├── db/                      
    │   │   └── config.js            
    │   ├── middleware/              
    │   │   └── auth.middleware.js    
    │   ├── models/                   
    │   │   ├── task.models.js        
    │   │   └── user.models.js       
    │   └── routes/                   
    │       ├── task.routes.js        
    │       └── user.routes.js        
    └── frontend/
        ├── README.md               
        ├── eslint.config.js          
        ├── index.html               
        ├── Login.jsx                 
        ├── package-lock.json         
        ├── package.json              
        ├── vercel.json              
        ├── vite.config.js            
        ├── .gitignore               
        ├── public/                   
        └── src/                       
            ├── App.css              
            ├── App.jsx             
            ├── index.css            
            ├── main.jsx           
            ├── assets/             
            ├── Component/           
            │   ├── Dashboard.jsx    
            │   ├── Login.jsx        
            │   └── Register.jsx     
            ├── config/              
            │   └── api.js          
            └── hooks/              
                └── useTask.jsx      
```
## Installation
### Prerequisites:
- Node.js (v16+)
- MongoDB (local or cloud instance)
- Vite (for frontend development)

### Steps:
1. **Clone the repository:**
   ```sh
   git clone https://github.com/SamSwnshi/task_management
  
   ```

2. **Setup Client:**
   ```sh
   cd frontend
   npm install
   npm run dev
   ```

3. **Setup Server:**
   ```sh
   cd backend
   npm install
   npm start
   ```

## Environment Variables
Create a `.env` file in both `client/` and `server/` directories.
### For the Client:
```
VITE_API_URL=http://localhost:5173
```

### For the Server:
```
PORT=8080
MONGO_URI=mongodb://localhost:27017
JWT_SECRET=your_jwt_secret
```


## Usage

Explain how to test the project and give some example.

```bash
Example
```

## Deploy

```
* Frontend: https://task-management-sameer-suryawanshis-projects.vercel.app
```

## Technologies

_Name the technologies used in the project._ 
* [Vite](https://spring.io/) - Framework Used.
* [React](https://reactjs.org/) - UI Library.

## Usage
Sign Up: Users can sign up by providing a username and password. The password will be securely hashed before storing it in the database.

Login: Once registered, users can log in to access the task management features. A JWT token will be generated upon successful login.

Task Management: Users can create, view, update, and delete tasks. Tasks can be filtered based on their status (e.g., Pending, Completed).

Secure API: All API endpoints that require user authentication will validate the JWT token sent in the request header.

## Contributing

Fork the repository

Create a new branch (git checkout -b feature-name)

Make your changes

Commit your changes (git commit -am 'Add new feature')

Push to the branch (git push origin feature-name)

Open a pull request


## License
This project is licensed under the MIT License..
