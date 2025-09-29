import { Schema, model } from 'mongoose';

const siteSchema = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    image: { type: String, required: true },
    score: { type: Number, required: true, min: 0, max: 10 }
}, { timestamps: true });

export default model('Site', siteSchema);
