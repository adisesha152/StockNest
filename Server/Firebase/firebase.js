import admin from 'firebase-admin';
import serviceAccount from './stock-trading-simulator-d00e1-firebase-adminsdk-e86z4-26de41fd44.json' with {type : "json"};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default admin;
