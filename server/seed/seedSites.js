import { connect } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import Site from '../models/siteModel.js';
const { deleteMany, insertMany } = Site;

const sites = [
    { name: 'Stack Overflow', url: 'https://stackoverflow.com', image: 'https://via.placeholder.com/150?text=StackOverflow', score: 9 },
    { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', image: 'https://via.placeholder.com/150?text=MDN', score: 8 },
    { name: 'GitHub', url: 'https://github.com', image: 'https://via.placeholder.com/150?text=GitHub', score: 9 },
    { name: 'NPM', url: 'https://www.npmjs.com', image: 'https://via.placeholder.com/150?text=NPM', score: 7 },
    { name: 'Google', url: 'https://www.google.com', image: 'https://via.placeholder.com/150?text=Google', score: 10 },
    { name: 'Figma', url: 'https://www.figma.com', image: 'https://via.placeholder.com/150?text=Figma', score: 7 }
];

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sitesDB';

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('✅ Connected to Mongo — seeding...');
        await Site.deleteMany({});
        await Site.insertMany(sites);
        console.log('✅ Seeding complete');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ Seed error:', err);
        process.exit(1);
    });
