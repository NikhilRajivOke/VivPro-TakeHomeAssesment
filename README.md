# VivPro-TakeHomeAssesment

This repository contains the solution for the VivPro.ai take-home assessment, involving a full-stack application with a React frontend and a Flask backend using SQLite for the database.

## Project Structure

- `frontend/`: React.js frontend application.
- `backend/`: Python Flask backend API.

## Setup Instructions

### Backend

1. Install the required backend dependencies:

    ```bash
    pip install -r requirements.txt
    ```

2. Navigate to the `backend/` directory and create a virtual environment:

    ```bash
    cd backend
    python -m venv venv
    ```

3. Activate the virtual environment:
    - On Windows: `venv\Scripts\activate`
    - On macOS/Linux: `source venv/bin/activate`

4. Start the Flask server:

    ```bash
    python run.py
    ```

The backend will be running on `http://localhost:5000`.

### Frontend

1. After the backend is running, navigate to the `frontend/` directory:

    ```bash
    cd frontend
    ```

2. Install frontend dependencies:

    ```bash
    npm install
    ```

3. Start the React application:

    ```bash
    npm start
    ```

The frontend will be running on `http://localhost:3000`.

## Future Scope

- **Adding Unit and Integration Tests**: Enhance the test coverage for both backend and frontend to ensure better code quality and reliability.
- **Setting Up CI/CD**: Integrate Continuous Integration and Continuous Deployment pipelines to automate testing and deployment, ensuring faster iterations and smoother deployments.
- **Optimizing Frontend with Redux**: Implement Redux state management for better handling of application state across components, and introduce dynamic loading (e.g., lazy loading) to optimize performance and reduce the initial load time.
- **Database Migration**: Incorporate database migration tools such as Flask-Migrate for easier management of database schema changes.
- **Security Enhancements**: Implement security best practices, such as input validation, JWT authentication, and HTTPS setup for secure communication.
