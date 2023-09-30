# URL-SM: A Responsive URL Shortening Website

A responsive URL shortening website with user authentication, password encryption, email verification, and password reset functionalities. This project is implemented using React, Tailwind CSS, Axios, Vite for the frontend, and Node.js, Express, MongoDB for the backend. SendGrid is used to send required emails from the server. The frontend code is deployed on Netlify, and the backend code is deployed on Render. Please note that the server on Render may take a minute to load if it's been idle due to Render's free tier limitations.

![Screenshot 2023-09-30 125404](https://github.com/renish47/url-sm/assets/107568859/a2e66090-e77d-459e-8438-bf9899bd7d3f)

## Table of Contents

- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Issues and Support](#issues-and-Support)

## Demo

Visit the live website: [https://url-sm.netlify.app](https://url-sm.netlify.app)

## Technologies Used

- Frontend:
  - React
  - Tailwind CSS
  - Axios
  - Vite

- Backend:
  - Node.js
  - Express
  - MongoDB
  - SendGrid

## Features

1. **User Signup and Email Verification**:
   - Users can sign up with their details.
   - An OTP is sent to the user's email for verification.
   - Users can request to resend the OTP, invalidating the old OTP.

2. **Password Encryption**:
   - User passwords are encrypted and securely stored in the database using the bcrypt.js package.

3. **User Signin**:
   - Users can sign in with their credentials.
   - A token is generated on the server and sent back to the client for authentication.
   - The token is automatically verified to allow users to access the app until it expires.

4. **Password Reset**:
   - Users can reset their password by providing their registered email.
   - A link is sent to the email for password reset, and the link expires after use.

5. **URL Shortening**:
   - Users can shorten any URL of any length.
   - Unique shortened URLs are generated using the nanoid package.
   - Shortened links redirect to their original URLs when used.

6. **Dashboard**:
   - Users can view all the shortened URLs they created.
   - The dashboard displays the usage count for each shortened URL.
   - Users can permanently delete created URLs.

7. **Responsive Design**:
   - The app is designed to be responsive for both small and large screens.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/renish47/url-sm.git
   cd url-sm
   ```

2. Install dependencies for both the frontend and backend:

   ```bash
   # Install frontend dependencies
   cd Frontend
   npm install

   # Install backend dependencies
   cd ../Backend
   npm install
   ```

3. Create a `.env` file in the `Backend` directory and add your environment variables. You can use the `.env.example` file as a template.

## Usage

1. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

   The server will be running on `http://localhost:8000`.

2. Start the frontend development server:

   ```bash
   cd frontend
   npm run dev
   ```

3. Open a web browser and visit `http://localhost:5173` to access the URL shortening website.



## Issues and Support

If you encounter any issues or need support with the URL-SM project, please feel free to open an issue on this repository. We'll do our best to assist you.



Thank you for using URL-SM! We hope you find it useful and enjoy using it.
