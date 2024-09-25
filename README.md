# Task Management Server

This project is a task management server built using **Express**, **MongoDB**, and **Mongoose**. It provides a robust backend for managing users and tasks, ensuring secure authentication and role-based access control.

## Features

### User Management:

- **Create Users**: Support for creating different user roles (Admins, Managers, Team Members).
- **User Authentication**: Implements login functionality with JWT tokens for secure access.

### Task Management:

- **CRUD Operations for Tasks**: Full capabilities to create, read, update, and delete tasks.
- **Task Assignment to Users**: Assign tasks to specific users for better management.
- **Task Status Updates**: Update task statuses (e.g., In Progress, Completed, etc.) easily.

### Project/Task Categories:

- **Categorize Tasks**: Organize tasks by project, type, or custom labels for improved clarity.

### Notifications/Preferences (Optional):

- **Task Update Notifications**: Users can receive notifications for any task updates.
- **User-Specific Preferences**: Personalize notification settings according to user preferences.

## Technologies Used

- **Node.js** for server-side JavaScript execution.
- **Express** for building the web server.
- **MongoDB** for the database.
- **Mongoose** for MongoDB object modeling.
- **Dotenv** for environment variable management.
- **CORS** for providing a Connect/Express middleware that can be used to enable CORS with various options..

## Setup Instructions

### Install Dependencies

Using **npm**:

```bash
npm install
```

### Set Up Environment Variables

NODE_ENV=development
PORT = 5000
DATABASE_URL=<your mongodb cluster uri>

### Start the Development Server

```bash
npm run start-dev

```

### Building for Production

```bash
npm run start

```

### Task End points

GET: {{base_url}}task?sortBy=dueDate&sortOrder=&userId=66f04bd36cfd1499c46fee2e
POST: {{base_url}}task/create-task
PATCH: {{base_url}}task/66edca86a7315b06b5aa75f0
DELETE: {{base_url}}task/66edca86a7315b06b5aa75f0

### User End points

GET: {{base_url}}/user/khandokershamimudfasdlhaque@gmail.com
PATCH: {{base_url}}user/create-user
PATCH: {{base_url}}task/preference

### License

This `README.md` provides a comprehensive overview of your backend project, detailing its features, setup instructions, and technology stack. Feel free to customize it further as needed!
