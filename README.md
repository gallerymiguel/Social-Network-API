
# Social Network API

## Description
This Social Network API allows users to share their thoughts, react to friends' thoughts, and manage a list of friends. Built with MongoDB, Mongoose, Express.js, and TypeScript, this API is designed to handle large amounts of unstructured data efficiently.

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Models](#models)
- [Walkthrough Video](#walkthrough-video)
- [Technologies Used](#technologies-used)

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd social-network-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   - Create a `.env` file in the root directory and add the following:
     ```env
     MONGODB_URI=mongodb://127.0.0.1:27017/socialNetworkDB
     PORT=3001
     ```
4. Build the project:
   ```bash
   npm run build
   ```
5. Start the server:
   ```bash
   npm run start
   ```

## Usage
Use an API client like Insomnia to test the API routes. The base URL for the API is:
```
http://localhost:3001
```

## API Routes
### User Routes
- **GET** `/api/users`
  - Get all users.
- **GET** `/api/users/:userId`
  - Get a single user by ID.
- **POST** `/api/users`
  - Create a new user.
  - Example body:
    ```json
    {
      "username": "testuser",
      "email": "testuser@example.com"
    }
    ```
- **PUT** `/api/users/:userId`
  - Update a user by ID.
- **DELETE** `/api/users/:userId`
  - Delete a user and their associated thoughts.
- **POST** `/api/users/:userId/friends/:friendId`
  - Add a friend to a user.
- **DELETE** `/api/users/:userId/friends/:friendId`
  - Remove a friend from a user.

### Thought Routes
- **GET** `/api/thoughts`
  - Get all thoughts.
- **GET** `/api/thoughts/:thoughtId`
  - Get a single thought by ID.
- **POST** `/api/thoughts`
  - Create a new thought.
  - Example body:
    ```json
    {
      "thoughtText": "This is a test thought!",
      "username": "testuser",
      "userId": "<USER_ID>"
    }
    ```
- **PUT** `/api/thoughts/:thoughtId`
  - Update a thought by ID.
- **DELETE** `/api/thoughts/:thoughtId`
  - Delete a thought by ID.
- **POST** `/api/thoughts/:thoughtId/reactions`
  - Add a reaction to a thought.
  - Example body:
    ```json
    {
      "reactionBody": "This is a test reaction!",
      "username": "testuser"
    }
    ```
- **DELETE** `/api/thoughts/:thoughtId/reactions`
  - Remove a reaction from a thought.

## Models
### User
- `username`: String (required, unique, trimmed)
- `email`: String (required, unique, valid email)
- `thoughts`: Array of Thought `_id` values
- `friends`: Array of User `_id` values
- Virtual: `friendCount`

### Thought
- `thoughtText`: String (required, 1-280 characters)
- `createdAt`: Date (default: current timestamp, formatted with a getter)
- `username`: String (required)
- `reactions`: Array of Reaction subdocuments
- Virtual: `reactionCount`

### Reaction (Subdocument)
- `reactionId`: ObjectId (default: new ObjectId)
- `reactionBody`: String (required, max 280 characters)
- `username`: String (required)
- `createdAt`: Date (default: current timestamp, formatted with a getter)

## Walkthrough Video
[Click here to view the walkthrough video](https://drive.google.com/file/d/1f3I2aDH2YfIZQq5OmFcvTxa44FMfhPGi/view?usp=sharing)

## Technologies Used
- MongoDB
- Mongoose
- Express.js
- TypeScript
- Node.js
