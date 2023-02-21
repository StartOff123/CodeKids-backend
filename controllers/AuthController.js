import jsonWebToken from "jsonwebtoken"
import bcrypt from 'bcrypt'
import chalk from "chalk"
import TeacherModel from '../models/Teacher.js'

export const register = async (req, res) => {
    try {
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new TeacherModel({
            name: req.body.name,
            surname: req.body.surname,
            login: req.body.login,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        })

        const teacher = await doc.save()
        const token = jsonWebToken.sign({
            _id: teacher._id
        }, 'secret123', { expiresIn: '30d' })

        const { passwordHash, ...teacherData } = teacher._doc

        res.json({
            ...teacherData,
            token
        })
        console.log(`${chalk.green('POST')} ${chalk.underline.italic.gray('/auth/registered')} success: ${chalk.green('true')}`)
    } catch (error) {
        res.status(403).json({
            message: 'Не удалось зарегестрироваться'
        })
        console.log(`${chalk.green('POST')} ${chalk.underline.italic.gray('/auth/registered')} success: ${chalk.red('false')}`)
    }
}

export const login = async (req, res) => {
    try {
        const teacher = await TeacherModel.findOne({ login: req.body.login })
        if (!teacher) {
            console.log(`${chalk.green('POST')} ${chalk.underline.italic.gray('/auth/login')} success: ${chalk.red('false')}`)
            return res.status(403).json({
                message: 'Неверный логин или пароль'
            })
        }

        const isValidPassword = await bcrypt.compare(req.body.password, teacher._doc.passwordHash)
        if (!isValidPassword) {
            console.log(`${chalk.green('POST')} ${chalk.underline.italic.gray('/auth/login')} success: ${chalk.red('false')}`)
            return res.status(403).json({
                message: 'Неверный логин или пароль'
            })
        }

        const token = jsonWebToken.sign({
            _id: teacher._id
        }, 'secret123', { expiresIn: '30d' })
        const { passwordHash, ...teacherData } = teacher._doc

        res.json({
            ...teacherData,
            token
        })
        console.log(`${chalk.green('POST')} ${chalk.underline.italic.gray('/auth/login')} success: ${chalk.green('true')}`)
    } catch (error) {
        res.status(403).json({
            message: 'Не удалось авторизоваться'
        }) 
        console.log(`${chalk.green('POST')} ${chalk.underline.italic.gray('/auth/login')} success: ${chalk.red('false')}`)
    }
}

export const getMe = async (req, res) => {
    try {
        const teacher = await TeacherModel.findById(req.teacherId)
        if (!teacher) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }

        const { passwordHash, ...teacherData } = teacher._doc
        res.json({
            ...teacherData
        })
        console.log(`${chalk.magenta('GET')} ${chalk.underline.italic.gray('/auth/me')} success: ${chalk.green('true')}`)
    } catch (error) {
        
    }
}