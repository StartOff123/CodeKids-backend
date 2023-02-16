import StudentModel from "../models/Student.js"

export const addStudent = async (req, res) => {
    try {
        const doc = StudentModel({
            name: req.body.name,
            surname: req.body.surname,
            phone: req.body.phone
        })

        const student = await doc.save()
        res.json(student)
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось добаить ученика'
        })
    }
}

export const removeStudent = (req, res) => {
    try {
        const studentId = req.params.id
        StudentModel.findByIdAndRemove({
            _id: studentId
        }, (error, doc) => {
            if (error) {
                return res.status(500).json({
                    message: 'Не удалось удалить ученика'
                })
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'Ученик не найден'
                })
            }

            res.json({
                success: true
            })
        })
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось удалить ученика'
        })
    }
}

export const updateStudent = async (req, res) => {
    try {
        const studentId = req.params.id
        await StudentModel.updateOne({
            _id: studentId
        }, {
            name: req.body.name,
            surname: req.body.surname,
            phone: req.body.phone,
        })

        res.json({
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось внести изменения'
        })
    }
}