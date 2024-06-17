import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

import firebaseConfig from '../../Server/Firebase/firebaseConfig.js'
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// import firebase from 'firebase/app'
// import 'firebase/auth'
// import firebaseConfig from './firebaseConfig'


// firebase.initializeApp(firebaseConfig)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
