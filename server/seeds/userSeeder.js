

const mongoose = require('mongoose');
const mongooseeder = require('mongooseeder');
const User = require('../models/user');
const Team = require('../models/team')
const shortid = require('shortid');

const faker = require('faker')

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

mongooseeder.seed({
  mongodbUrl: 'mongodb://heroku_kfpm55q0:oqpadjiohh1g2iihs3p2lujcgg@ds119732.mlab.com:19732/heroku_kfpm55q0',
  models: { User, Team },
  clean: true,
  mongoose: mongoose,
  seeds: () => {

  	console.log('Creating Users');
  	var users = [];
  	for (let i = 1; i < 4; i++) {
  		var user = new User({
        _id: shortid.generate(),
        username: `user${ i }`,
        email: faker.internet.email(),
        password: 'test123',
  		})
  	users.push(user);
  	}

  	console.log('Saving...');
  	var promises = [];
  	[
  		users
  	].forEach(collection => {
  		collection.forEach(model => {
  			promises.push(model.save());
  		});
  	});
  	return Promise.all(promises);
	}
});
