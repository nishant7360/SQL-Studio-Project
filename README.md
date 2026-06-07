# SQL Query Execution Learning Platform

A full-stack web application designed to help users learn SQL through interactive problem-solving. Users can write, execute, and validate SQL queries against real datasets while receiving AI-powered hints and tracking their progress.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Installation & Setup](#installation--setup)
- [System Flowcharts](#system-flowcharts)
- [API Documentation](#api-documentation)
- [Features Detailed](#features-detailed)
- [Usage Guide](#usage-guide)

---

## Overview

This platform provides an interactive environment for users to:

- Learn SQL by solving real-world database problems
- Execute queries against PostgreSQL databases with seeded data
- Receive AI-generated hints when stuck (powered by Groq API)
- Track learning progress and view performance analytics
- Manage user authentication with secure JWT tokens

---

## Features

### 🔐 Authentication

- User registration with email verification (OTP)
- JWT-based authentication with HTTP-only cookies
- Password reset functionality via email
- Change password capability

### 📝 SQL Assignments

- Browse curated SQL questions organized by difficulty
- Real-time SQL editor with syntax highlighting (Monaco Editor)
- Execute SELECT queries safely against isolated datasets
- View actual query results vs expected output
- Track completed and pending assignments

### 💡 AI-Powered Hints

- Generate contextual hints using Groq LLM
- Hints based on query difficulty and user level
- Multiple hint levels to guide without spoiling

### 👤 User Profile

- View learning statistics and progress
- Difficulty ring visualization showing proficiency across levels
- Solved questions counter
- Profile customization

### ⚙️ Settings

- Dark/Light theme toggle
- Account management options

---

## Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (with Neon for serverless)
- **Authentication**: JWT + bcrypt
- **ORM**: Mongoose (for user management)
- **AI Integration**: Groq SDK
- **Email**: Nodemailer
- **Other**: Morgan (logging), CORS, Cookie Parser

### Frontend

- **Framework**: React 19 with Vite
- **UI Components**: Shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Code Editor**: Monaco Editor
- **State Management**: React Context + TanStack Query (React Query)
- **HTTP Client**: Axios
- **Routing**: React Router v7
- **Notifications**: React Hot Toast

---

## Project Structure

```
SQL query exec/
├── backend/
│   ├── app.js                    # Express app configuration
│   ├── server.js                 # Server entry point
│   ├── package.json
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── queryController.js    # SQL execution logic
│   │   ├── assignmentController.js
│   │   ├── userController.js     # User management
│   │   └── hintController.js     # Hint generation
│   ├── models/
│   │   ├── userModel.js          # User schema
│   │   └── assignmentModel.js    # Assignment schema
│   ├── routes/
│   │   ├── userRoutes.js         # Auth endpoints
│   │   ├── queryRoute.js         # Query execution
│   │   ├── assignmentRoute.js    # Assignment endpoints
│   │   └── hintRoute.js          # Hint endpoints
│   └── utils/
│       ├── db.js                 # Database connection
│       ├── groq.js               # Groq AI client
│       ├── sendMail.js           # Email service
│       ├── cookieOption.js       # Cookie config
│       ├── pgSeeding.js          # Database seeding
│       └── seedAssignments.js    # Assignment seeding
├── frontend/
│   ├── src/
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # Entry point
│   │   ├── components/
│   │   │   ├── AppLayout.jsx     # Main layout wrapper
│   │   │   ├── SQLEditor.jsx     # Monaco editor component
│   │   │   ├── ResultPanel.jsx   # Results display
│   │   │   ├── QuestionCard.jsx  # Question preview
│   │   │   ├── Header.jsx        # Navigation header
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── ThemeProvider.jsx # Theme management
│   │   │   └── ui/               # Shadcn components
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Landing page
│   │   │   ├── QuestionSet.jsx   # Questions list
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Signin.jsx        # Sign up page
│   │   │   ├── Profile.jsx       # User profile
│   │   │   ├── Settings.jsx      # Settings page
│   │   │   └── PageNotFound.jsx
│   │   ├── features/
│   │   │   ├── auth/             # Auth features (login, signup, password reset)
│   │   │   ├── Query/            # Query execution
│   │   │   └── Questions/        # Question display
│   │   ├── services/
│   │   │   ├── apiAuth.js        # Auth API calls
│   │   │   ├── apiQuery.js       # Query API calls
│   │   │   ├── apiQuestion.js    # Question API calls
│   │   │   └── apiHints.js       # Hint API calls
│   │   ├── context/
│   │   │   └── queryContext.jsx  # Global query state
│   │   └── lib/
│   │       └── utils.js          # Utility functions
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── package.json
```

---

## Architecture

### System Architecture Diagram

```mermaid
graph TB
    Client[Browser Client]
    Frontend[React Frontend<br/>Vite + TailwindCSS]
    BackendServer[Node.js Server<br/>Express.js]
    JWT[JWT Auth<br/>HTTP-only Cookies]
    Postgres[(PostgreSQL Database<br/>with Neon)]
    GroqAPI[Groq AI API<br/>Hint Generation]
    EmailService[Email Service<br/>Nodemailer]

    Client <-->|HTTP/HTTPS| Frontend
    Frontend <-->|REST API| BackendServer
    BackendServer <-->|Verify Token| JWT
    BackendServer <-->|Query Execution| Postgres
    BackendServer <-->|Generate Hints| GroqAPI
    BackendServer <-->|Send Emails| EmailService

    style Frontend fill:#61dafb,stroke:#333,stroke-width:2px,color:#000
    style BackendServer fill:#90c53f,stroke:#333,stroke-width:2px,color:#000
    style Postgres fill:#336791,stroke:#333,stroke-width:2px,color:#fff
    style GroqAPI fill:#ff6b6b,stroke:#333,stroke-width:2px,color:#fff
```

---

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL / Neon Database
- Groq API Key (for AI hints)
- Email service credentials (Gmail, SendGrid, etc.)

### Backend Setup

1. **Clone & Navigate**

```bash
cd backend
npm install
```

2. **Configure Environment Variables** (`.env`)

```env
# Database
DATABASE_URL=postgresql://user:password@host:port/dbname
NEON_CONNECTION_STRING=<your-neon-connection-string>

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Authentication
AUTH_EMAIL=your-email@gmail.com
AUTH_PASS=your-app-password

# Groq AI
GROQ_API_KEY=your-groq-api-key

# Server
PORT=5000
NODE_ENV=development
```

3. **Start Backend**

```bash
npm run dev          # Development with nodemon
# or
npm start            # Production
```

### Frontend Setup

1. **Install Dependencies**

```bash
cd frontend
npm install
```

2. **Configure API URL** (`src/services/apiConfig.js`)

```javascript
const API_BASE_URL = "http://localhost:5000/api";
```

3. **Start Frontend**

```bash
npm run dev          # Development server
# or
npm run build        # Production build
```

---

## System Flowcharts

### 1. User Authentication Flow

```mermaid
flowchart TD
    A[User Visits App] --> B{Authenticated?}
    B -->|No| C[Redirect to Login]
    B -->|Yes| D[Load Dashboard]

    C --> E{New User?}
    E -->|Yes| F[Sign Up Page]
    E -->|No| G[Login Page]

    F --> H[Enter Email & Password]
    H --> I[Backend Validates<br/>Hash Password<br/>Create User]

    G --> J[Enter Email & Password]
    J --> K[Backend Verifies<br/>Compare Hash]

    K --> L{Valid?}
    L -->|No| M[Show Error]
    M --> G
    L -->|Yes| N[Generate JWT]

    I --> O{User Exists?}
    O -->|Yes| P[Send OTP Email]
    O -->|No| Q[Create Account]

    Q --> R[Send Verification OTP]
    P --> S[User Enters OTP]
    S --> T{OTP Valid?}
    T -->|No| U[Resend OTP]
    U --> S
    T -->|Yes| N

    N --> V[Set HTTP-only Cookie]
    V --> D

    style A fill:#e1f5ff
    style D fill:#c8e6c9
    style M fill:#ffcdd2
```

### 2. SQL Query Execution Flow

```mermaid
flowchart TD
    A[User Selects Question] --> B[Load Question Details]
    B --> C[Display Question & Sample Data]
    C --> D[User Types SQL Query]
    D --> E{Valid Query?}

    E -->|No| F[Show Error Message]
    F --> D

    E -->|Yes| G[Send Query to Backend]
    G --> H[Backend Validates<br/>Only SELECT allowed]

    H --> I{Query Safe?}
    I -->|No| J[Return Error]
    J --> K[Show Error to User]
    K --> D

    I -->|Yes| L[Fetch Assignment Info]
    L --> M[Rewrite Table Names<br/>Add Seed Prefix]
    M --> N[Execute Against DB]

    N --> O{Success?}
    O -->|Error| P[Return Error Details]
    P --> Q[Show Error<br/>User can debug]
    Q --> D

    O -->|Success| R[Get Query Results]
    R --> S[Fetch Expected Output]
    S --> T[Compare Results]

    T --> U{Match?}
    U -->|Yes| V[Show Success Message<br/>Mark as Solved<br/>Update Progress]
    U -->|No| W[Show Results vs Expected]
    W --> X[Offer Hints]

    V --> Y[Display ResultPanel]
    W --> Y
    X --> Z[Call AI to Generate Hint]

    style A fill:#fff3e0
    style Y fill:#c8e6c9
    style K fill:#ffcdd2
    style V fill:#a5d6a7
```

### 3. AI Hint Generation Flow

```mermaid
flowchart TD
    A[User Requests Hint] --> B[Get Assignment Details]
    B --> C[Get User Query]
    C --> D[Prepare Context<br/>- Question Text<br/>- User Query<br/>- Expected Output<br/>- Sample Data]

    D --> E[Send to Groq API<br/>with Prompt Template]
    E --> F{API Success?}

    F -->|Error| G[Return Fallback Hint]
    F -->|Success| H[Parse AI Response]

    G --> I[Display Hint to User]
    H --> J{Response Valid?}

    J -->|No| K[Try Alternative Format]
    J -->|Yes| L[Format Hint Text]

    K --> I
    L --> I

    I --> M[User Can Request<br/>More Hints]

    style A fill:#f3e5f5
    style I fill:#c8e6c9
    style G fill:#fff9c4
```

### 4. User Progress Tracking Flow

```mermaid
flowchart TD
    A[Question Solved Successfully] --> B[Backend Updates<br/>User Submission]
    B --> C[Increment Solved Count]
    C --> D[Update Difficulty Stats<br/>Track Easy/Medium/Hard]

    D --> E[Calculate Accuracy]
    E --> F[Fetch All User Submissions]
    F --> G[Calculate Progress %]

    G --> H[Update User Profile]
    H --> I[Generate Statistics]

    I --> J[Display on Profile Page]
    J --> K[Show Difficulty Ring<br/>Visual Progress]
    K --> L[Display Achievement Badges]

    style A fill:#fff3e0
    style J fill:#c8e6c9
    style K fill:#b3e5fc
```

### 5. Complete User Journey Flow

```mermaid
flowchart LR
    A[Landing Page] -->|Register/Login| B[Dashboard]
    B -->|Browse| C[Questions List]
    C -->|Select| D[Question Detail]
    D -->|Write Query| E[SQL Editor]
    E -->|Execute| F[Result Panel]

    F -->|Success| G[Mark Solved]
    F -->|Failed| H{Need Hint?}

    H -->|Yes| I[Generate Hint]
    I -->|Try Again| E
    H -->|No| E

    G --> J[Update Progress]
    J --> K[View Profile]
    K --> L{Continue Learning?}

    L -->|Yes| C
    L -->|No| M[Logout]

    D -.->|View Hints| I
    K -.->|Edit Profile| N[Settings]
    N -->|Change Theme| K

    style A fill:#fff3e0
    style G fill:#c8e6c9
    style M fill:#ffcdd2
```

---

## API Documentation

### Authentication Endpoints

| Method | Endpoint                    | Description                     |
| ------ | --------------------------- | ------------------------------- |
| POST   | `/api/auth/signup`          | Register new user               |
| POST   | `/api/auth/login`           | User login                      |
| POST   | `/api/auth/verify-otp`      | Verify OTP                      |
| POST   | `/api/auth/forgot-password` | Initiate password reset         |
| POST   | `/api/auth/reset-password`  | Reset password with token       |
| POST   | `/api/auth/change-password` | Change password (authenticated) |
| GET    | `/api/auth/me`              | Get current user info           |
| POST   | `/api/auth/logout`          | Logout user                     |

### Query Endpoints

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/query/execute` | Execute SQL query |
| GET    | `/api/query/:id`     | Get query results |

### Assignment Endpoints

| Method | Endpoint                    | Description               |
| ------ | --------------------------- | ------------------------- |
| GET    | `/api/assignment/all`       | Get all assignments       |
| GET    | `/api/assignment/:id`       | Get specific assignment   |
| POST   | `/api/assignment/submit`    | Submit assignment         |
| GET    | `/api/assignment/completed` | Get completed assignments |

### Hint Endpoints

| Method | Endpoint                  | Description      |
| ------ | ------------------------- | ---------------- |
| POST   | `/api/hint/generate`      | Generate AI hint |
| GET    | `/api/hint/:assignmentId` | Get hint history |

---

## Features Detailed

### 1. Authentication System

**Registration Process:**

- Email validation
- OTP verification via email
- Password hashing with bcrypt
- JWT token generation

**Login Process:**

- Email/password verification
- JWT issued and stored in HTTP-only cookie
- Protected routes check token validity

**Security Features:**

- JWT expiration (7 days default)
- HTTP-only cookies prevent XSS
- Password hashing with salt rounds
- CORS protection
- Request validation

### 2. SQL Query Execution

**Safe Query Execution:**

- Only SELECT queries allowed (no UPDATE, DELETE, INSERT)
- Dynamic table name rewriting prevents conflicts
- Isolated databases per assignment seed
- Query timeout protection

**Query Flow:**

1. User writes SQL query
2. Backend validates syntax
3. Table names are rewritten (e.g., `users` → `q1_users`)
4. Query executed against PostgreSQL
5. Results returned and compared with expected output

### 3. Assignment Management

**Assignment Structure:**

```javascript
{
  title: String,
  description: String,
  difficulty: "Easy|Medium|Hard",
  sampleTables: Array,
  expectedOutput: Array,
  seedIndex: Number
}
```

**Difficulty Categories:**

- **Easy**: Basic SELECT queries
- **Medium**: JOINs, GROUP BY, aggregates
- **Hard**: Complex nested queries, window functions

### 4. AI-Powered Hints

**Hint Generation:**

- Uses Groq LLM API
- Context-aware based on question and user query
- Progressive hints (level 1-3)
- Error analysis and suggestion

### 5. Progress Tracking

**User Statistics:**

- Total questions solved
- Breakdown by difficulty
- Accuracy percentage
- Streak tracking
- Time per question

**Visualization:**

- Difficulty ring showing proficiency
- Progress bar for each difficulty level
- Achievement badges

---

## Usage Guide

### For Students

1. **Sign Up**
   - Visit home page → Click "Sign Up"
   - Enter email and password
   - Verify OTP sent to email
   - Account created

2. **Explore Questions**
   - Navigate to "Question Set"
   - Filter by difficulty
   - Click on question to see details

3. **Solve Problem**
   - Read question and view sample data
   - Write SQL query in editor
   - Click "Execute" to test query
   - Check if output matches expected

4. **Get Help**
   - If stuck, click "Get Hint"
   - AI generates contextual hint
   - Try again with hint assistance

5. **Track Progress**
   - Visit "Profile" to see statistics
   - View difficulty ring visualization
   - Check solved questions count

### For Administrators

1. **Add New Questions**
   - Run seedAssignments.js
   - Define questions in database

2. **Monitor Usage**
   - Check user submissions
   - Review difficulty statistics

---

## Development Tips

### Backend Development

```bash
# Development mode with auto-reload
npm run dev

# Debug mode
DEBUG=* npm run dev
```

### Frontend Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview

# Lint code
npm run lint
```

### Database Seeding

```bash
# Seed initial data
node backend/utils/pgSeeding.js
node backend/utils/seedAssignments.js
```

---

## Performance Optimization

- **Frontend**: Vite for fast bundling, React Query for efficient data fetching
- **Backend**: Connection pooling with PostgreSQL
- **Caching**: React Query stale time optimization
- **Database**: Indexed queries for faster execution

---

## Error Handling

**Common Errors & Solutions:**

| Error                                 | Solution                                   |
| ------------------------------------- | ------------------------------------------ |
| `Invalid query - Only SELECT allowed` | Ensure query starts with SELECT            |
| `Table not found`                     | Check table names match sample data        |
| `Connection timeout`                  | Verify PostgreSQL is running               |
| `GROQ_API_KEY missing`                | Add key to .env file                       |
| `CORS error`                          | Verify frontend URL in backend CORS config |

---

## Future Enhancements

- [ ] Real-time query results with WebSocket
- [ ] Query optimization suggestions
- [ ] Collaborative learning rooms
- [ ] Advanced query visualization
- [ ] Mobile app
- [ ] Leaderboard system
- [ ] Custom question creation
- [ ] Query execution history

---

## License

MIT License - Feel free to use for educational purposes

---

## Support

For issues, questions, or suggestions:

1. Check the troubleshooting section above
2. Review API documentation
3. Check console logs for errors
4. Verify environment variables

---

**Last Updated**: June 7, 2026

Happy Learning! 🚀
