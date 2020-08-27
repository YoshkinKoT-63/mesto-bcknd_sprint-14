const users = require('express').Router();
const { getUsers, getUser, createUser } = require('../controllers/user');

users.get('/', getUsers);

users.get('/:id', getUser);

users.post('/', createUser);

module.exports = users;
