import mongoose from 'mongoose'

const LinkSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    title: {
        type: String,
        required: [true, 'Link title is required'], // Added custom error message
        trim: true,
        maxlength: [100, 'Link title cannot exceed 100 characters'] // Added custom error message
    },
    url: {
        type: String,
        required: [true, 'Link URL is required'], // Added custom error message
        trim: true,
        match: [/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/, 'Please enter a valid URL'] // <--- ADDED: URL format validation regex
    },
    type: {
        type: String,
        trim: true,
        lowercase: true,
        default: 'website'
    },
    // order: { // <--- ADDED: The 'order' field as previously discussed
    //     type: Number,
    //     required: [true, 'Link order is required'], // Essential for custom sorting
    //     default: 0
    // },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Link = mongoose.model('Link', LinkSchema)
export default Link;