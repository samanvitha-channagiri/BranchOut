import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'], 
        unique: true,
        lowercase:true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long'] ,
        match: [/^[a-z0-9_-]+$/, 'Username can only contain lowercase letters, numbers, underscores, and hyphens']
    },
    email: {
        type: String,
        required: [true, 'Email is required'], 
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'] 
    },
    password: {
        type: String,
        required: [true, 'Password is required'], 
        minlength: [6, 'Password must be at least 6 characters long'], 
        select: false 
    },
    // isEmailVerified: {
    //     type: Boolean,
    //     default: true
    // },
    profilePictureUrl: {
        type: String,
        default: 'https://via.placeholder.com/150' 
    },
    title: {
        type: String,
        maxlength: [100, 'Title cannot exceed 100 characters'], 
        default: ''
    },
    description: {
        type: String,
        maxlength: [500, 'Description cannot exceed 500 characters'], 
        default: ''
    }
    //,
    // uniqueShareSlug: { 
    //     type: String,
    //     unique: true,
    //     required: [true, 'Share slug is required'], 
    //     trim: true,
    //     lowercase: true,
        
    //     // match: [/^[a-z0-9-]+$/, 'Share slug can only contain lowercase letters, numbers, and hyphens']
    // }
}, {
    timestamps: true 
});


UserSchema.pre('save', async function(next) {
    // Only hash if the password has been modified (or is new)
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare entered password with hashed password in DB
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;