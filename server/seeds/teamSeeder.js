const mongoose = require('mongoose');
const mongooseeder = require('mongooseeder');
const Team = require('../models/team');
const faker = require('faker')

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

mongooseeder.seed({
	mongodbUrl: 'mongodb://heroku_kfpm55q0:oqpadjiohh1g2iihs3p2lujcgg@ds119732.mlab.com:19732/heroku_kfpm55q0',
	models: { Team },
	clean: true,
	mongoose: mongoose,
	seeds: () => {

		console.log('Creating Teams');
		var teams = [];
		var user1 = new Team({
			userId: `user1`,
			team: ['user2'],
			teamSend: ['user3'],
			teamReceived: ['user4']
		})
		teams.push(user1);

		var user2 = new Team({
			userId: `user2`,
			team: ['user1'],
			teamSend: [],
			teamReceived: []
		})
		teams.push(user2);

		var user3 = new Team({
			userId: `user3`,
			team: [],
			teamSend: [],
			teamReceived: ['user1']
		})
		teams.push(user3);

		var user4 = new Team({
			userId: `user4`,
			team: [],
			teamSend: ['user1'],
			teamReceived: []
		})
		teams.push(user4);

		console.log('Saving...');
		var promises = [];
		[
		teams
		].forEach(collection => {
			collection.forEach(model => {
				promises.push(model.save());
			});
		});
		return Promise.all(promises);
	}

});
