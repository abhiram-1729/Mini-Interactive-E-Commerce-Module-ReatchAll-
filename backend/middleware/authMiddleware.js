import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import admin from '../config/firebaseAdmin.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // If Firebase Admin is initialized, try verifying as Firebase Token first
            if (admin.apps.length > 0) {
                try {
                    const decodedToken = await admin.auth().verifyIdToken(token);
                    console.log('Firebase Token Verified for:', decodedToken.email);

                    if (!decodedToken.email) {
                        console.error('Firebase token is missing email claim.');
                        res.status(401);
                        throw new Error('Token verification failed: Email missing.');
                    }

                    let user = await User.findOne({ email: decodedToken.email });

                    if (!user) {
                        console.warn(`401 Error: User ${decodedToken.email} exists in Firebase but NOT IN MONGODB. Sync required.`);
                        res.status(401);
                        throw new Error(`Sync Error: Account ${decodedToken.email} not found in store database. Please log in again.`);
                    }

                    req.user = user;
                    return next();
                } catch (firebaseError) {
                    console.error('Firebase Auth Error:', firebaseError.code, firebaseError.message);
                    // If it's a valid attempt at a Firebase token but failed, we should probably stop here
                    if (firebaseError.code && firebaseError.code.startsWith('auth/')) {
                        res.status(401);
                        throw new Error(`Firebase Auth Failed: ${firebaseError.message}`);
                    }
                }
            }

            console.log('Falling back to checking if it is a legacy JWT...');
            if (token.length < 300) {
                try {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
                    req.user = await User.findById(decoded.id).select('-password');
                    console.log('Legacy JWT Verified for User ID:', decoded.id);
                    return next();
                } catch (jwtError) {
                    console.error('Legacy JWT verification failed:', jwtError.message);
                }
            } else {
                console.warn('Token looks like a Firebase token but failed verification. Skipping legacy JWT.');
            }

            res.status(401);
            throw new Error('Not authorized, token verification failed');
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

const adminOnly = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

export { protect, adminOnly as admin };
