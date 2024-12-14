import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

// Get all users
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Unable to fetch users', details: err });
    }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id).populate('thoughts friends');
        if (!user) {
            res.status(404).json({ message: 'No user found with that ID' });
        } else {
        res.status(200).json(user);
    } 
} catch (err) {
        res.status(500).json({ error: 'Error fetching user', details: err });
    }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Unable to create user', details: err });
    }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            res.status(404).json({ message: 'No user found with that ID' });
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Unable to update user', details: err });
    }
};

// Delete a user and their associated thoughts
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'No user found with that ID' });
            return;
        }
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.status(200).json({ message: 'User and associated thoughts deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Unable to delete user', details: err });
    }
};

// Add a friend to a user's friend list
export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );
        if (!user) {
            res.status(404).json({ message: 'No user found with that ID' });
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Unable to add friend', details: err });
    }
};

// Remove a friend from a user's friend list
export const removeFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        if (!user) {
            res.status(404).json({ message: 'No user found with that ID' });
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Unable to remove friend', details: err });
    }
};
