import chalk from 'chalk'

import TeacherModel from "../models/Teacher.js"

export const root = async (req, res) => {
    try {
        await TeacherModel.updateOne({
            _id: req.params.id
        }, {
            status: 'admin'
        })

        res.json({
            success: true
        })
        console.log(`${chalk.yellow('PATCH')} ${chalk.underline.italic.gray('/root')} success: ${chalk.green('true')}`)
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось обработать запорс'
        })
        console.log(`${chalk.yellow('PATCH')} ${chalk.underline.italic.gray('/root')} success: ${chalk.red('false')}`)
    }
}

export const noRoot = async (req, res) => {
    try {
        await TeacherModel.updateOne({
            _id: req.params.id
        }, {
            status: 'defaultTeacher'
        })

        res.json({
            success: true
        })
        console.log(`${chalk.yellow('PATCH')} ${chalk.underline.italic.gray('/noroot')} success: ${chalk.green('true')}`)
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось обработать запорс'
        })
        console.log(`${chalk.yellow('PATCH')} ${chalk.underline.italic.gray('/noroot')} success: ${chalk.red('false')}`)
    }
}