import chalk from 'chalk'

import LessonModel from '../models/Lesson.js'

export const monthlyReport = async (req, res) => {
    console.log(1)
    try {
        await LessonModel.find({ status: 'held', date: {$gt: req.body.gt, $lt: req.body.lt} }).exec((err, docs) => {
            if (err) {
                return res.status(403).json({ success: false })
            }

            res.json(docs)
        })
    } catch (error) {
        res.status(403).json({ success: false })
    }
}