# VivPro-TakeHomeAssesment

This repository contains the solution for the take-home assessment for VivPro.ai. The assessment involves building a full-stack application with a front-end that interacts with a back-end API.

## Project Structure

- `frontend/`: Contains the React.js frontend application.
- `backend/`: Contains the Python Flask backend application.

## Setup Instructions

### Backend

1. Navigate to the `backend` directory and create a virtual environment:

    ```bash
    cd backend
    python -m venv venv
    ```

2. Activate the virtual environment:
    - On Windows: `venv\Scripts\activate`
    - On macOS/Linux: `source venv/bin/activate`

3. Install the backend dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Ensure that PostgreSQL is running and configure the database in `config.py`.

5. Start the Flask server:

    ```bash
    python app.py
    ```

The backend will now be running on `http://localhost:5000`.

### Frontend

1. After the backend is up and running, navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Install the frontend dependencies:

    ```bash
    npm install
    ```

3. Start the React application:

    ```bash
    npm start
    ```

The frontend will now be running on `http://localhost:3000`.
