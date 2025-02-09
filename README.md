# CodeCraftHub

## Overview
CodeCraftHub is a backend application that provides user authentication and profile management APIs using Node.js, Express, MongoDB, and JWT.

## Features
- User registration with hashed passwords
- User authentication with JWT token
- Update user profile by email or username
- Secure password handling using bcrypt

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/HSk2703/CodeCraftHub.git
   cd CodeCraftHub
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure environment variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### User Routes

#### Register a new user
- **Endpoint:** `POST /register`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully",
    "user": { "id": "123", "name": "John Doe", "email": "johndoe@example.com" }
  }
  ```

#### User Login
- **Endpoint:** `POST /login`
- **Request Body:**
  ```json
  {
    "email": "johndoe@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "token": "your_jwt_token"
  }
  ```

#### Update User by Email
- **Endpoint:** `PUT /update`
- **Request Body:**
  ```json
  {
    "email": "johndoe@example.com",
    "name": "John Smith",
    "password": "newpassword"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Profile updated successfully",
    "user": { "id": "123", "name": "John Smith", "email": "johndoe@example.com" }
  }
  ```

#### Update User by Username
- **Endpoint:** `PUT /:username`
- **Request Body:**
  ```json
  {
    "newUsername": "john_smith",
    "email": "john_smith@example.com"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Profile updated successfully",
    "user": { "id": "123", "name": "john_smith", "email": "john_smith@example.com" }
  }
  ```

## Technologies Used
- Node.js
- Express.js
- MongoDB
- bcrypt.js
- jsonwebtoken

## License
This project is licensed under the MIT License.

