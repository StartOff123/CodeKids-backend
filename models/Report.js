import mongoose from "mongoose"

const ReportSchema = new mongoose.Schema({
    student: { type: String, require: true },
    teacher: { type: String, require: true },
    title: { type: String, require: true },
    theme: { type: String, require: true },
    serialNumber: { type: Number, require: true }
}, {
    timestamps: true
})

export default mongoose.model('Report', ReportSchema)