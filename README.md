# StockNest

StockNest is a stock trading application that allows users to explore, invest, and manage their stock portfolios. It is built with React and integrates with Firebase for authentication.

## Features

- **User Authentication**: Sign up and login with Firebase authentication.
- **Explore Stocks**: Browse and search for different stocks.
- **Investments Management**: View and manage your current investments.
- **Wallet**: Check your wallet balance and transaction history.
- **Account Management**: Update and manage user account details.
- **Logout**: Securely logout from the application.

## Technologies Used

- **Frontend**: React, React Router, Axios, Framer Motion
- **Backend**: Node.js, Express (Assumed for API endpoints)
- **Authentication**: Firebase Authentication
- **Styling**: Bootstrap, CSS

## Getting Started

Follow these instructions to set up and run the project on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- Firebase account for authentication

### Installation

1. Clone the repository:

```bash
git clone https://github.com/adisesha152/StockNest.git
cd stocknest
```

2. Install the dependencies:

```bash
npm install
```

3. Set up Firebase:

   - Create a Firebase project in the Firebase console.
   - Enable Firebase Authentication.
   - Copy your Firebase config and replace the Firebase configuration in your project.

4. Create a `.env` file in the root directory and add the following:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

5. Start the development server:

```bash
npm start
```

The application should now be running on `http://localhost:3000`.

## Project Structure

Here's a brief overview of the project's structure:

```
stock-trading-simulator/
│
├── public/
│   ├── index.html
│   └── ...
│
├── src/
│   ├── assets/
│   │   └── profile.png
│   │
│   ├── components/
│   │   ├── UserNav.jsx
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Investments.jsx
│   │   ├── Login.jsx
│   │   ├── Account.jsx
│   │   ├── Wallet.jsx
│   │   └── ...
│   │
│   ├── App.jsx
│   ├── index.js
│   └── ...
│
└── package.json
```

## Usage

### User Authentication

- **Sign Up**: Register a new user account using Firebase Authentication.
- **Login**: Log in with existing credentials.
- **Logout**: Securely log out from the application.

### Stock Exploration

- **Search**: Use the search bar to find stocks.
- **Explore**: Browse through various stock options.

### Investments Management

- **View Investments**: See the list of your current investments.
- **Manage Investments**: Buy or sell stocks.

### Account Management

- **Profile**: View and update your profile information.
- **Wallet**: Check your wallet balance and view transaction history.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request to add new features or fix issues.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to the contributors and the open-source community for their invaluable work.
- Icons by Bootstrap Icons.
- News by NewsAPI
- Stocks by Financial Modelling Prep
- Crypto by CoinGecko

---