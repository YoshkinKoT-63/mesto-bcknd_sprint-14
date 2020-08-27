const cards = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/card');

cards.get('/', getCards);
cards.post('/', createCard);
cards.delete('/:cardId', deleteCard);

module.exports = cards;
