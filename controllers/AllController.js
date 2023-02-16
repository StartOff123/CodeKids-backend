import TeacherModel from "../models/Teacher.js"
import StudenModel from "../models/Student.js"

export const getAllTeachers = async (req ,res) => {
    try {
        const teacher = await TeacherModel.find()

        res.json(teacher)
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось вернуть таблицу учителей'
        })
    }
}

export const getAllStudents = async (req ,res) => {
    try {
        const student = await StudenModel.find()

        res.json(student)
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось вернуть таблицу учеников'
        })
    }
}