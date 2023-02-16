import LessonModel from "../models/Lesson.js"
import ReportModel from "../models/Report.js"
import StudentModel from '../models/Student.js'
import TeacherModel from '../models/Teacher.js'

export const addLesson = async (req, res) => {
    try {
        const student = await StudentModel.findById(req.body.studentId).exec()
        console.log(student)
        const doc = new LessonModel({
            title: req.body.title,
            theme: req.body.theme,
            date: req.body.date,
            student: student.name + ' ' + student.surname,
            teacher: req.teacherId,
        })
        const lesson = await doc.save()

        res.json(lesson)
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось добавить урок'
        })
    }
}

export const allLessons = async (req, res) => {
    try {
        const lessons = await LessonModel.find({ teacher: req.teacherId }).exec()
        res.json(lessons)
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось вернуть уроки'
        })
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
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось удалить урок'
        })
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
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось внести изменения'
        })
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
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось провести урок'
        })
    }
}