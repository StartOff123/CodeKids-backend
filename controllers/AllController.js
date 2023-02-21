import chalk from "chalk"

import TeacherModel from "../models/Teacher.js"
import StudenModel from "../models/Student.js"

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