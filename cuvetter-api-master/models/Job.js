// import mongoose from 'mongoose';

// const JobSchema = new mongoose.Schema({
//     companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
//     jobTitle: { type: String, required: true },
//     jobDescription: { type: String, required: true },
//     experienceLevel: { type: String, required: true },
//     candidate: [{ type: String, required: true }],
//     endDate: { type: Date, required: true },
//     postedAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Job', JobSchema);







import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },

    jobTitle: { type: String, required: true, trim: true },

    jobDescription: { type: String, required: true },

    experienceLevel: { type: String, required: true },

    candidate: [{ type: String, required: true }],

    endDate: { type: Date, required: true },

    postedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Job', JobSchema);
