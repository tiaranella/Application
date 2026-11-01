# Evento
Evento is a full-stack event management platform that allows users to discover public events, create their own gatherings, and manage their schedules through a calendar.

## Features
- **User Authentication**: Secure registration and login utilizing JWT-based authentication.
- **Event Discovery**: Browse public events via an interactive dashboard displaying event dates, locations, and capacity limits.
- **Event Management**: Create, edit, and manage public or private events.
- **Attendance Tracking**: Join or leave events with real-time capacity updates and participant counting.
- **Personal Calendar**: View joined and hosted events in a personalized calendar with month and custom week views.
- **Responsive Design**: Fully responsive layout with a mobile-friendly sidebar and navigation menu.
- **Role-Based Access Control**: Distinct roles (User and Admin) to manage platform permissions and elevated privileges.

## Tech Stack
### Frontend
- **Framework**: React 18 + Vite + TypeScript
- **Routing**: React Router v6
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form + Yup
- **Calendar UI**: React Big Calendar + date-fns
- **Notifications**: React Hot Toast

### Backend
- **Framework**: NestJS + TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT & bcrypt

## Prerequisites
Before you begin, ensure you have the following installed on your machine:
- Node.js (v18 or higher recommended)
- npm or yarn
- PostgreSQL (if running the database locally)

## Environment Variables
For convenience, .env.example template files are provided. Copy these to create your local .env files in both the frontend and backend directories:

```
# In the root directory
cp .env.example .env
```
Update the newly created .env files with your local configuration:
### Root Directory
```
# Database connection string
DATABASE_URL="postgresql://user:password@localhost:5433/evento?schema=public"

# Secret key for JWT signing
JWT_SECRET="secret_jwt_key_here"

# Server Port
PORT=8080
```

## Getting Started (Local Development)
### Backend Setup
Navigate to your backend directory, install dependencies, and initialize the database.

```
cd application-backend

# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run database migrations to create tables
npx prisma migrate dev --name init

# (Optional) Seed the database with initial test data
npx prisma db seed

# Start the NestJS development server
npm run start:dev
```

The backend will be running at ```http://localhost:8080```.

### Frontend Setup
Open a new terminal, navigate to your frontend directory, and start the Vite development server.

```
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

The frontend will be running at ```http://localhost:5173```.
