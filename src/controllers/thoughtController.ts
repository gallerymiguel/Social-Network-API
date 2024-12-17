import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';

// Get all thoughts
export const getAllThoughts = async (_req: Request, res: Response): Promise<void> => {
    try {
        const thoughts = await Thought.find(); // .populate('reactions');
        res.status(200).json(thoughts);
    } catch (err) {
        res.status(500).json({ error: 'Unable to fetch thoughts', details: err });
    }
};

// Get a single thought by ID
export const getThoughtById = async (req: Request, res: Response): Promise<void> => {
    try {
        const thought = await Thought.findById(req.params.id); // .populate('reactions');
        if (!thought) {
            res.status(404).json({ message: 'No thought found with that ID' });
            return;
        }
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching thought', details: err });
    }
};

// Create a new thought
export const createThought = async (req: Request, res: Response): Promise<void> => {
    try {
        const thought = await Thought.create(req.body); // Create a new thought
        await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
        res.status(201).json(thought);
    } catch (err) {
        res.status(500).json({ error: 'Unable to create thought', details: err });
    }
};

// Update a thought by ID
export const updateThought = async (req: Request, res: Response): Promise<void> => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought found with that ID' });
            return;
        }
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json({ error: 'Unable to update thought', details: err });
    }
};

// Delete a thought by ID
export const deleteThought = async (req: Request, res: Response): Promise<void> => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.id);
        if (!thought) {
            res.status(404).json({ message: 'No thought found with that ID' });
            return;
        }
        res.status(200).json({ message: 'Thought deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Unable to delete thought', details: err });
    }
};

// Add a reaction to a thought
export const addReaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $addToSet: { reactions: req.body } },
            { new: true }
        );
        if (!thought) {
            res.status(404).json({ message: 'No thought found with that ID' });
            return;
        }
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json({ error: 'Unable to add reaction', details: err });
    }
};

// Remove a reaction from a thought
export const removeReaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.body.reactionId } } },
            { new: true }
        );
        if (!thought) {
            res.status(404).json({ message: 'No thought found with that ID' });
            return;
        }
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json({ error: 'Unable to remove reaction', details: err });
    }
};
