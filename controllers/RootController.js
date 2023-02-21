import TeacherModel from "../models/Teacher.js"

export const root = async (req, res) => {
    try {
        await TeacherModel.updateOne({
            _id: req.body.id
        }, {
            status: 'admin'
        })

        res.json({
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось обработать запорс'
        })
    }
}

export const noRoot = async (req, res) => {
    try {
        await TeacherModel.updateOne({
            _id: req.body.id
        }, {
            status: 'defaultTeacher'
        })

        res.json({
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось обработать запорс'
        })
    }
}