import ReportModel from '../models/Report.js'

export const add = async (req ,res) => {
    try {
        const report = await ReportModel.find()

        res.json(report)
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось вернуть отчет'
        })
    }
}

export const removeAll = async (req, res) => {
    try {
        await ReportModel.deleteMany()

        res.status(200).json({
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось вернуть отчет'
        })
    }
}