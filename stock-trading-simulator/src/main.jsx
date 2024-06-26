import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { SpeedInsights } from "@vercel/speed-insights/react"

import firebaseConfig from '../../Server/Firebase/firebaseConfig.js'
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <SpeedInsights/>
  </React.StrictMode>,
)
