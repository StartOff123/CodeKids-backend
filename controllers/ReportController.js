import chalk from 'chalk'

import ReportModel from '../models/Report.js'

export const all = async (req ,res) => {
    try {
        const report = await ReportModel.find()

        res.json(report)
        console.log(`${chalk.magenta('GET')} ${chalk.underline.italic.gray('/report')} success: ${chalk.green('true')}`)
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось вернуть отчет'
        })
        console.log(`${chalk.magenta('GET')} ${chalk.underline.italic.gray('/report')} success: ${chalk.red('false')}`)
    }
}

export const removeAll = async (req, res) => {
    try {
        await ReportModel.deleteMany()

        res.status(200).json({
            success: true
        })
        console.log(`${chalk.red('DELETE')} ${chalk.underline.italic.gray('/report/remove')} success: ${chalk.green('true')}`)
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось вернуть отчет'
        })
        console.log(`${chalk.red('DELETE')} ${chalk.underline.italic.gray('/report/remove')} success: ${chalk.red('false')}`)
    }
}