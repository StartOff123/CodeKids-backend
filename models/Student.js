import mongoose from "mongoose"

const StudentSchema = new mongoose.Schema({
    name: { type: String, require: true },
    surname: { type: String, require: true },
    phone: { type: Number, require: true },
})

export default mongoose.model('Studetn', StudentSchema)