require('dotenv').config();

const mongoose = require('mongoose');
const mongooseeder = require('mongooseeder');
const Board = require('../models/board');
const List = require('../models/list');
const Card = require('../models/card');

const faker = require('faker')

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

mongooseeder.seed({
  mongodbUrl: process.env.MONGODB_URI,
  models: { Board, List, Card },
  useNewUrlParser: true,
  clean: true,
  mongoose: mongoose,
  seeds: () => {

    console.log('Creating Boards');
    var boards = [];
    for (let i = 1; i < 10; i++) {
      var board = new Board({
        _id: `foo${ i }`,
        userId: 'user1',
        title: faker.company.companyName(),
        description: faker.company.catchPhrase(),
      })
    boards.push(board);
    }

    console.log('Saving...');
    var promises = [];
    [
      boards
    ].forEach(collection => {
      collection.forEach(model => {
        promises.push(model.save());
      });
    });
    return Promise.all(promises);
  }

});
