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
  mongodbUrl: 'mongodb://heroku_kfpm55q0:oqpadjiohh1g2iihs3p2lujcgg@ds119732.mlab.com:19732/heroku_kfpm55q0',
  models: { Board, List, Card },
  clean: false,
  mongoose: mongoose,
  seeds: () => {

    console.log('Creating Lists');
    var lists = [];
    for (let i = 1; i < 40; i++) {

      let genRan = getRandomInt(1, 5);

      var list = new List({
        _id: `bar${ i }`,
        boardId: `foo${ genRan }`,
        title: faker.commerce.productName(),
        description: faker.company.catchPhrase(),
      })
    lists.push(list);
    }

    console.log('Saving...');
    var promises = [];
    [
      lists
    ].forEach(collection => {
      collection.forEach(model => {
        promises.push(model.save());
      });
    });
    return Promise.all(promises);
  }

});
