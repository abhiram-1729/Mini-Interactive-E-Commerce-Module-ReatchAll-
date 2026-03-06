import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// TODO: You must download your service account JSON from Firebase Console
// Settings > Service Accounts > Generate new private key
// Then place it in the backend folder and point to it here.
// OR set the environment variables:
// FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY

const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n').replace(/^"(.*)"$/, '$1')
        : undefined,
};

if (serviceAccount.projectId && serviceAccount.clientEmail && serviceAccount.privateKey) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase Admin Initialized');
} else {
    console.warn('Firebase Admin NOT initialized. Missing environment variables.');
}

export default admin;
