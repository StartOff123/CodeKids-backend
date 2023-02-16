import { body } from "express-validator"

export const registerValidation = [
    body('name', 'Укажите имя').isLength({ min: 2 }),
    body('surname', 'Укажите фаимилию').isLength({ min: 2 }),
    body('login', 'Укажите логин').isLength({ min: 4 }),
    body('password', 'Длинна пароля должна быть не меньше 8 символов').isLength({ min: 8 }),
]

export const loginValidation = [
    body('login', 'Укажите логин').isLength({ min: 4 }),
    body('password', 'Длинна пароля должна быть не меньше 8 символов').isLength({ min: 8 }),
]

export const studentValidation = [
    body('name', 'Укажите имя').isLength({ min: 2 }),
    body('surname', 'Укажите фаимилию').isLength({ min: 2 }),
    body('phone', 'Неверный формат телефона').isMobilePhone('ru-RU')
]

export const teacherValidation = [
    body('name', 'Укажите имя').isLength({ min: 2 }),
    body('surname', 'Укажите фаимилию').isLength({ min: 2 }),
    body('password', 'Длинна пароля должна быть не меньше 8 символов').isLength({ min: 8 }),
]

export const updateTeacherValidation = [
    body('name', 'Укажите имя').isLength({ min: 2 }),
    body('surname', 'Укажите фаимилию').isLength({ min: 2 }),
]

export const passwordValidation = [
    body('password', 'Длинна пароля должна быть не меньше 8 символов').isLength({ min: 8 }),
]

export const lessonValidation = [
    body('title', 'Укажите название урока').isLength({ min: 2 }),
    body('date', 'Укажите дату урока').isISO8601(),
]

export const remiderValidation = [
    body('title', 'Укажите название заметки').isLength({ min: 2 }),
    body('content', 'Укажите содержимое замтеки').isLength({ min: 6 }),
]