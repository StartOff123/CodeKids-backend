import mongoose from "mongoose"

const RemiderSchema = new mongoose.Schema({
    title: { type: String, require: true },
    content: String,
    teacher: { type: mongoose.Schema.Types.ObjectId, require: true },
})

export default mongoose.model('Remider', RemiderSchema)