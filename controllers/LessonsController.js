import chalk from "chalk"

import LessonModel from "../models/Lesson.js"
import ReportModel from "../models/Report.js"
import StudentModel from '../models/Student.js'
import TeacherModel from '../models/Teacher.js'

export const addLesson = async (req, res) => {
    try {
        const student = await StudentModel.findById(req.body.studentId).exec()
        const doc = new LessonModel({
            title: req.body.title,
            theme: req.body.theme,
            date: req.body.date,
            student: student.name + ' ' + student.surname,
            teacher: req.teacherId,
        })
        const lesson = await doc.save()

        res.json(lesson)
        console.log(`${chalk.green('POST')} ${chalk.underline.italic.gray('/lessons/add')} success: ${chalk.green('true')}`)
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось добавить урок'
        })
        console.log(`${chalk.green('POST')} ${chalk.underline.italic.gray('/lessons/add')} success: ${chalk.red('false')}`)
    }
}

export const allLessons = async (req, res) => {
    try {
        const lessons = await LessonModel.find({ teacher: req.teacherId }).exec()
        res.json(lessons)
        console.log(`${chalk.magenta('GET')} ${chalk.underline.italic.gray('/lessons/all')} success: ${chalk.green('true')}`)
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось вернуть уроки'
        })
        console.log(`${chalk.magenta('GET')} ${chalk.underline.italic.gray('/lessons/all')} success: ${chalk.red('false')}`)
    }
}

export const removeLesson = (req, res) => {
    try {
        const lessonId = req.params.id
        LessonModel.findByIdAndRemove({
            _id: lessonId
        }, (error, doc) => {
            if (error) {
                return res.status(500).json({
                    message: 'Не удалось удалить урок'
                })
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'Урок не найден'
                })
            }

            res.json({
                success: true
            })
        })
        console.log(`${chalk.red('DELETE')} ${chalk.underline.italic.gray('/lessons/remove/' + lessonId)} success: ${chalk.green('true')}`)
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось удалить урок'
        })
        console.log(`${chalk.red('DELETE')} ${chalk.underline.italic.gray('/lessons/remove/' + req.params.id)} success: ${chalk.red('false')}`)
    }
}

export const updateLesson = async (req, res) => {
    try {
        const lessonId = req.params.id
        await LessonModel.updateOne({
            _id: lessonId
        }, {
            title: req.body.title,
            theme: req.body.theme,
            date: req.body.date,
        })

        res.json({
            success: true
        })
        console.log(`${chalk.yellow('PATCH')} ${chalk.underline.italic.gray('/lessons/update/' + lessonId)} success: ${chalk.green('true')}`)
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось внести изменения'
        })
        console.log(`${chalk.yellow('PATCH')} ${chalk.underline.italic.gray('/lessons/update/' + req.params.id)} success: ${chalk.red('false')}`)
    }
}

export const heldLesson = async (req, res) => {
    try {
        const lessonId = req.params.id
        await LessonModel.updateOne({
            _id: lessonId
        }, {
            status: 'held'
        })
        
        const lesson = await LessonModel.findById({ _id: lessonId })
        const teacher = await TeacherModel.findById(lesson.teacher).exec()
        const doc = new ReportModel({
            teacher: teacher.name + ' ' + teacher.surname,
            student: lesson.student,
            title: lesson.title,
            theme: lesson.theme,
        })
        const report = await doc.save()
 
        res.json(report)
        console.log(`${chalk.yellow('PATCH')} ${chalk.underline.italic.gray('/lessons/held/' + lessonId)} success: ${chalk.green('true')}`)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось провести урок'
        })
        console.log(`${chalk.yellow('PATCH')} ${chalk.underline.italic.gray('/lessons/held/' + req.params.id)} success: ${chalk.red('false')}`)
    }
}