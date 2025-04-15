# Nepal Events - Event Booking Platform

A comprehensive Nepali event booking platform that celebrates cultural diversity and provides seamless event discovery and registration. The platform offers a user-friendly interface with traditional design elements and support for local event providers and attendees.

## Features

- Browse and search traditional Nepali events
- User authentication (login/register)
- Shopping cart functionality
- Event booking system
- Khalti payment integration
- Responsive design with cultural elements
- Provider dashboard for event management

## Prerequisites

Before running the project, make sure you have the following installed:
- Node.js (version 16 or higher)
- npm (usually comes with Node.js)
- A code editor (VS Code recommended)
- Khalti merchant account for payment processing

## Installation Steps

1. **Project Setup**
   - Extract the downloaded project files to your desired location
   - Remove configuration files that aren't needed for local development:
     - Delete `.replit` file (if present)
     - Delete `replit.nix` file (if present)

2. **Open the Project**
   - Open the extracted folder in VS Code or your preferred editor
   - Open a terminal in the project directory

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Environment Setup**
   - Create a new file named `.env` in the root directory
   - Add the following content to the `.env` file:
   ```
   SESSION_SECRET=3b27d5e886744e9eb185c1f1e0e030c1
   KHALTI_PUBLIC_KEY=your_khalti_public_key
   KHALTI_SECRET_KEY=your_khalti_secret_key
   ```
   Note: Replace `your_khalti_public_key` and `your_khalti_secret_key` with your actual Khalti API keys

5. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The application will start running at `http://localhost:5000`

## Usage

1. **Access the Application**
   - Open your browser and navigate to `http://localhost:5000`
   - You should see the homepage with featured events

2. **Register/Login**
   - Click on the "Login" button in the navigation bar
   - Choose "Register" if you're a new user
   - Fill in the required information
   - For event providers, check the "Register as event provider" option

3. **Browse Events**
   - View all events on the homepage
   - Click on events to see details
   - Add events to cart or book directly

4. **Making Payments**
   - Click "Pay with Khalti" on any event card
   - Enter your Khalti credentials in the payment modal
   - Complete the payment process
   - You'll receive a confirmation once the payment is successful

5. **Shopping Cart**
   - Click the cart icon to view your selected events
   - Adjust quantities or remove items
   - Proceed to checkout when ready

## Common Issues and Solutions

1. **Session Secret Error**
   - If you see a "secret option required for sessions" error, make sure you've created the `.env` file with the SESSION_SECRET as described in the installation steps.

2. **Port Already in Use**
   - If port 5000 is already in use, you can modify the port number in `server/index.ts`

3. **Dependencies Installation Failed**
   - Try deleting the `node_modules` folder and `package-lock.json` file
   - Run `npm install` again

4. **Khalti Payment Issues**
   - Ensure you've added both KHALTI_PUBLIC_KEY and KHALTI_SECRET_KEY to your `.env` file
   - Make sure you're using a test account for development
   - Check the browser console for any error messages

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions and configurations
│   │   └── pages/        # Page components
├── server/                # Backend Express server
│   ├── routes.ts         # API routes
│   ├── auth.ts           # Authentication logic
│   └── storage.ts        # Data storage implementation
└── shared/               # Shared types and schemas
    └── schema.ts         # Database schema and types
```

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## Support

For any issues or questions, please open an issue in the repository.