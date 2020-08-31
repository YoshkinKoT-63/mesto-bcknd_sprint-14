const users = require('express').Router();
const { getUsers, getUser } = require('../controllers/user');

users.get('/', getUsers);

users.get('/:id', getUser);

module.exports = users;
