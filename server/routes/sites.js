// routes/sites.js
import { Router } from 'express';
import { Types } from 'mongoose';
import Joi from 'joi';
import Site from '../models/siteModel.js';

const router = Router();

// Joi schema
const siteJoiSchema = Joi.object({
    name: Joi.string().min(2).required(),
    url: Joi.string().min(5).max(200).required(),
    image: Joi.string().min(5).max(300).required(),
    score: Joi.number().min(0).max(10).required()
});

// GET all sites
router.get('/', async (req, res) => {
    try {
        const sites = await Site.find().sort({ name: 1 });
        res.json(sites);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET site by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' });

    try {
        const site = await Site.findById(id);
        if (!site) return res.status(404).json({ error: 'Site not found' });
        res.json(site);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create new site
router.post('/', async (req, res) => {
    const { error } = siteJoiSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const site = new Site(req.body);
        await site.save();
        res.status(201).json(site);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update site by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' });

    const { error } = siteJoiSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const updated = await Site.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Site not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE site by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' });

    try {
        const deleted = await Site.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ error: 'Site not found' });
        res.json({ message: 'Site deleted', id: deleted._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
