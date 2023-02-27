import chalk from "chalk"

import StudentModel from "../models/Student.js"
import LessonModel from "../models/Lesson.js"

export const addStudent = async (req, res) => {
    try {
        const doc = StudentModel({
            name: req.body.name,
            surname: req.body.surname,
            phone: req.body.phone
        })

        const student = await doc.save()
        res.json(student)
        console.log(`${chalk.green('POST')} ${chalk.underline.italic.gray('/student/add')} success: ${chalk.green('true')}`)
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось добаить ученика'
        })
        console.log(`${chalk.green('POST')} ${chalk.underline.italic.gray('/student/add')} success: ${chalk.red('false')}`)
    }
}

export const removeStudent = async (req, res) => {
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
        
        await LessonModel.deleteMany({ student: studentId })
        console.log(`${chalk.red('DELETE')} ${chalk.underline.italic.gray('/student/remove/' + studentId)} success: ${chalk.green('true')}`)
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось удалить ученика'
        })
        console.log(`${chalk.red('DELETE')} ${chalk.underline.italic.gray('/student/remove/' + req.params.id)} success: ${chalk.red('false')}`)
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
        console.log(`${chalk.yellow('PATCH')} ${chalk.underline.italic.gray('/student/update/' + studentId)} success: ${chalk.green('true')}`)
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось внести изменения'
        })
        console.log(`${chalk.yellow('PATCH')} ${chalk.underline.italic.gray('/student/update/' + req.params.id)} success: ${chalk.red('false')}`)
    }
}