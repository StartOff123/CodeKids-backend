import express from "express"
import mongoose from "mongoose"
import multer from "multer"
import cors from "cors"
import chalk from "chalk"

import { AuthController, AllController, StudentController, TeacherController, LessonsController, RemidersController, ReportController, RootController } from './controllers/index.js'
import { lessonValidation, registerValidation, remiderValidation, studentValidation, teacherValidation, updateTeacherValidation } from "./validations/validations.js"
import validationErrors from "./utils/validationErrors.js"
import checkAuth from "./utils/checkAuth.js"

//Подключение к БД
mongoose
    .connect('mongodb+srv://admin:StartOff0492@cluster0.y1zox4x.mongodb.net/CodeKits?retryWrites=true&w=majority')
    .then(() => console.log('Подключение к БД:', chalk.green('ОК')))
    .catch(error => console.log('Подключения к БД:', chalk.red('ERR::'), error))

//Создание сервера и его состовляющих
const app = express()
const storage = multer.diskStorage({
    destination: (_, __, callback) => {
        callback(null, 'uploads')
    },
    filename: (_, file, callBack) => {
        callBack(null, file.originalname)
    }
})
const upload = multer({ storage })

//Настройки сервера
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

//Порт сервера
const PORT = process.env.PORT || 5555

//Закрузка аватарки
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

//Регистрация и авторизация
app.post('/auth/registered', registerValidation, validationErrors, AuthController.register)
app.post('/auth/login', AuthController.login)
app.get('/auth/me', checkAuth, AuthController.getMe)

//Получение полных таблиц учителей, учеников и уроков
app.get('/teachers', checkAuth, AllController.getAllTeachers)
app.get('/students', checkAuth, AllController.getAllStudents)
app.get('/lessons', checkAuth, AllController.getAllLessons)

//Обноваление пароля
app.patch('/password/:id', checkAuth,  TeacherController.updatePassword )

//Добавление и удаление учеников
app.post('/student/add', checkAuth, studentValidation, validationErrors, StudentController.addStudent)
app.delete('/student/remove/:id', checkAuth, StudentController.removeStudent)
app.patch('/student/update/:id', checkAuth, studentValidation, validationErrors, StudentController.updateStudent)

//Обновление и удаление учителей
app.delete('/teacher/remove/:id', checkAuth, TeacherController.removeTeacher)
app.patch('/teacher/update/:id', checkAuth, updateTeacherValidation, validationErrors, TeacherController.updateTeacher)

//Уроки
app.get('/lessons/all', checkAuth, LessonsController.allLessons)
app.post('/lessons/add', checkAuth, lessonValidation, validationErrors, LessonsController.addLesson)
app.delete('/lessons/remove/:id', checkAuth, LessonsController.removeLesson)
app.patch('/lessons/update/:id', checkAuth, lessonValidation, validationErrors, LessonsController.updateLesson)
app.patch('/lessons/held/:id', checkAuth, LessonsController.heldLesson)

//Заметки
app.get('/remiders/all', checkAuth, RemidersController.allRemiders)
app.post('/remiders/add', checkAuth, remiderValidation, validationErrors, RemidersController.addRemider)
app.delete('/remiders/remove/:id', checkAuth, RemidersController.removeRemider)

//Отчет 
app.get('/report', ReportController.all)
app.delete('/report/remove', checkAuth, ReportController.removeAll)

//Права администратора
app.patch('/root/:id', checkAuth, RootController.root)
app.patch('/noroot/:id', checkAuth, RootController.noRoot)

//Запуск сервера
app.listen(PORT, error => {
    if (error) throw console.log('Ошибка при запуске сервера: ', error)
    console.log('Сервер запущен на проту:', chalk.green(PORT))
})