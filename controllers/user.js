/* eslint-disable consistent-return, newline-per-chained-call */
const bcrypt = require('bcryptjs');
const PasswordValidator = require('password-validator');
const User = require('../models/user');

const passwordValidatorSchema = new PasswordValidator();

passwordValidatorSchema
  .is().min(8)
  .has().uppercase()
  .has().lowercase()
  .has().digits(1)
  .has().not().spaces();

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUser = (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный id пользователя' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  if (!passwordValidatorSchema.validate(password)) {
    return res.status(401).send({ message: 'пароль должен быть не менее 8 символов, содержать заглавные и строчные буквы, цифры' });
  }
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};
/* eslint-disable consistent-return, newline-per-chained-call */
