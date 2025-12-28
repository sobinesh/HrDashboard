# Genezys Innovations - HR Dashboard Model

This project is a frontend application for an internal Human Resources (HR) dashboard. It features a complete, production-grade authentication module with a clean, professional user interface.

The entire backend and authentication logic is mocked for demonstration purposes, using browser storage to simulate user sessions.

## Features

- **User Login**: Secure login form with validation and loading states.
- **Session Management**: Remembers logged-in users using browser cookies.
- **First-Time Login Flow**: New users with default credentials are required to change their password upon first login.
- **Password Change**: A secure form for users to update their password.
- **Forgot Password**: A multi-step flow to allow users to reset their password via a simulated OTP.
- **Protected Dashboard**: A simple dashboard page accessible only to authenticated users.
- **Professional UI**: Built with ShadCN UI and Tailwind CSS for a polished, modern look.
- **Responsive Design**: The interface is fully responsive and works on desktop and mobile devices.
- **User Feedback**: Toast notifications for success, error, and info messages.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```sh
   cd <project-directory>
   ```

3. Install the dependencies:
   ```sh
   npm install
   ```

### Running the Development Server

To start the app in development mode, run the following command:

```sh
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser to see the application.

## Authentication Demo

The application uses a mocked authentication system. Use the following credentials to test the login flow:

- **Username**: `admin`
- **Password**: `Test@123`

Upon logging in with these credentials for the first time, you will be redirected to the "Change Password" page, as required. Once you set a new password, you will be able to log in with it and access the main dashboard.
