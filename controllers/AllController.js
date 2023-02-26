import chalk from "chalk"

import TeacherModel from "../models/Teacher.js"
import StudenModel from "../models/Student.js"
import LessonModel from "../models/Lesson.js"

export const getAllTeachers = async (req ,res) => {
    try {
        const teacher = await TeacherModel.find()

        res.json(teacher)
        console.log(`${chalk.magenta('GET')} ${chalk.underline.italic.gray('/teachers')} success: ${chalk.green('true')}`)
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось вернуть таблицу учителей'
        })
        console.log(`${chalk.magenta('GET')} ${chalk.underline.italic.gray('/teachers')} success: ${chalk.red('false')}`)
    }
}

export const getAllStudents = async (req ,res) => {
    try {
        const student = await StudenModel.find()

        res.json(student)
        console.log(`${chalk.magenta('GET')} ${chalk.underline.italic.gray('/students')} success: ${chalk.green('true')}`)
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось вернуть таблицу учеников'
        })
        console.log(`${chalk.magenta('GET')} ${chalk.underline.italic.gray('/students')} success: ${chalk.red('false')}`)
    }
}

export const getAllLessons = async (req, res) => {
    try {
        const lesson = await LessonModel.find()
        res.json(lesson)
        console.log(`${chalk.magenta('GET')} ${chalk.underline.italic.gray('/lessons')} success: ${chalk.green('true')}`)
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось вернуть таблицу уроков'
        })
        console.log(`${chalk.magenta('GET')} ${chalk.underline.italic.gray('/lessons')} success: ${chalk.red('false')}`)
    }
}