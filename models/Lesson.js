import mongoose from "mongoose"

const LessonSchema = new mongoose.Schema({
    title: { type: String, require: true },
    theme: String,
    date: { type: Date, require: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, require: true },
    student: { type: String, require: true },
    status: { type: String, require: true, default: 'coming' },
})

export default mongoose.model('Lesson', LessonSchema)