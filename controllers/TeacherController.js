import TeacherModel from "../models/Teacher.js"
import bcrypt from 'bcrypt'

export const removeTeacher = (req, res) => {
    try {
        const teacherId = req.params.id
        TeacherModel.findByIdAndRemove({
            _id: teacherId
        }, (error, doc) => {
            if (error) {
                return res.status(500).json({
                    message: 'Не удалось удалить учителя'
                })
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'Учитель не найден'
                })
            }

            res.json({
                success: true
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Не удалось удалить учителя'
        })
    }
}

export const updateTeacher = async (req, res) => {
    try {
        const teacherId = req.params.id

        await TeacherModel.updateOne({
            _id: teacherId
        }, {
            name: req.body.name,
            surname: req.body.surname,
            avatarUrl: req.body.avatarUrl,
        }) 

        res.json({
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Не удалось внести изменения'
        })
    }
}

export const updatePassword = async (req, res) => {
    try {
        const teacherId = req.params.id
        const newPassword = req.body.newPassword

        const teacher = await TeacherModel.findById(teacherId)
        const isValidPassword = await bcrypt.compare(req.body.oldPassword, teacher._doc.passwordHash)
        
        if (!isValidPassword) {
            return res.status(500).json({
                "message": "Старый пароль введен не верно"
            })
        }
        
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newPassword, salt)

        await TeacherModel.updateOne({
            _id: teacherId
        }, {
            passwordHash: hash
        })

        res.json({
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Не удалось изменить пароль'
        })
    }
}