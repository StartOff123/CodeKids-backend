import chalk from 'chalk'

import RemiderModel from '../models/Remider.js'

export const allRemiders = async (req, res) => {
    try {
        const remider = await RemiderModel.find({ teacher: req.teacherId }).exec()
        res.json(remider)
        console.log(`${chalk.magenta('GET')} ${chalk.underline.italic.gray('/remiders/all')} success: ${chalk.green('true')}`)
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось вернуть заметки'
        })
        console.log(`${chalk.magenta('GET')} ${chalk.underline.italic.gray('/remiders/all')} success: ${chalk.red('false')}`)
    }
}

export const addRemider = async (req, res) => {
    try {
        const doc = new RemiderModel({
            title: req.body.title,
            content: req.body.content,
            teacher: req.teacherId
        })
        const remider = await doc.save()

        res.json(remider)
        console.log(`${chalk.green('POST')} ${chalk.underline.italic.gray('/remiders/add')} success: ${chalk.green('true')}`)
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось добавить заметку'
        })
        console.log(`${chalk.green('POST')} ${chalk.underline.italic.gray('/remiders/add')} success: ${chalk.red('false')}`)
    }
}

export const removeRemider = (req, res) => {
    try {
        const remiderId = req.params.id
        RemiderModel.findByIdAndRemove({
            _id: remiderId
        }, (error, doc) => {
            if (error) {
                return res.status(500).json({
                    message: 'Не удалось удалить заметку'
                })
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'Заметка не найдена'
                })
            }

            res.json({
                success: true
            })
        })
        console.log(`${chalk.red('DELETE')} ${chalk.underline.italic.gray('/remiders/remove' + remiderId)} success: ${chalk.green('true')}`)
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось удалить заметку'
        })
        console.log(`${chalk.red('DELETE')} ${chalk.underline.italic.gray('/remiders/remove' + req.params.id)} success: ${chalk.red('false')}`)
    }
}