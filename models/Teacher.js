import mongoose from "mongoose"
import mongooseUniqueValidator from "mongoose-unique-validator"

const TeacherSchema = new mongoose.Schema({
    name: { type: String, require: true },
    surname: { type: String, require: true },
    login: { type: String, require: true, unique: true },
    status: { type: String, require: true, default: 'defaultTeacher' },
    passwordHash: { type: String, require: true },
    avatarUrl: { type: String, default: '' }
}, {
    timestamps: true
})

TeacherSchema.plugin(mongooseUniqueValidator)
export default mongoose.model('Teacher', TeacherSchema)