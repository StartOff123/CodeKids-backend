import bcrypt from 'bcrypt'
import chalk from 'chalk'

import TeacherModel from "../models/Teacher.js"
import RemideModel from "../models/Remider.js"
import LessonModel from "../models/Lesson.js"

export const removeTeacher = async (req, res) => {
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

        await RemideModel.deleteMany({ teacher: teacherId })
        await LessonModel.deleteMany({ teacher: teacherId })

        console.log(`${chalk.red('DELETE')} ${chalk.underline.italic.gray('/teacher/remove/' + teacherId)} success: ${chalk.green('true')}`)
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось удалить учителя'
        })
        console.log(`${chalk.red('DELETE')} ${chalk.underline.italic.gray('/teacher/remove/' + req.params.id)} success: ${chalk.red('false')}`)
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
        console.log(`${chalk.yellow('PATCH')} ${chalk.underline.italic.gray('/teacher/update/' + teacherId)} success: ${chalk.green('true')}`)
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось внести изменения'
        })
        console.log(`${chalk.yellow('PATCH')} ${chalk.underline.italic.gray('/teacher/update/' + req.params.id)} success: ${chalk.red('false')}`)
    }
}

export const updatePassword = async (req, res) => {
    try {
        const teacherId = req.params.id
        const newPassword = req.body.newPassword

        const teacher = await TeacherModel.findById(teacherId)
        const isValidPassword = await bcrypt.compare(req.body.oldPassword, teacher._doc.passwordHash)

        if (!isValidPassword) {
            console.log(`${chalk.yellow('PATCH')} ${chalk.underline.italic.gray('/password/' + teacherId)} success: ${chalk.red('false')}`)
            return res.status(500).json({
                message: 'Старый пароль введен не верно'
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
        console.log(`${chalk.yellow('PATCH')} ${chalk.underline.italic.gray('/password/' + teacherId)} success: ${chalk.green('true')}`)
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось изменить пароль'
        })
        console.log(`${chalk.yellow('PATCH')} ${chalk.underline.italic.gray('/password/' + req.params.id)} success: ${chalk.red('false')}`)
    }
}