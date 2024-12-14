import { Schema, model, Types } from 'mongoose';
import { formatDate } from '../utils/dataFormat.js';

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp: Date) => formatDate(timestamp),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            {
                reactionId: {
                    type: Schema.Types.ObjectId,
                    default: () => new Types.ObjectId(),
                },
                reactionBody: {
                    type: String,
                    required: true,
                    maxlength: 280,
                },
                username: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                    get: (timestamp: Date) => formatDate(timestamp),
                },
            },
        ],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const Thought = model('Thought', thoughtSchema);

export default Thought;
