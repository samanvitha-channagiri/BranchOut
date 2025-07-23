// import mongoose from 'mongoose';

// const EmailVerificationTokenSchema =new mongoose.Schema({
//     userId:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'User',
//         required:true,
//         unique:true
//     },
//     token: {
//         type: String,
//         required: true,
//         unique: true // The token itself must be unique
//     },
//     expiresAt: {
//         type: Date,
//         required: true,
//         // Automatically delete documents after 'expiresAt' time
//         index: { expires: '1s' } // MongoDB TTL index to expire documents automatically
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// })


// const EmailVerificationToken = mongoose.model('EmailVerificationToken', EmailVerificationTokenSchema);

// export default EmailVerificationToken;