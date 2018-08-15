# Djello Project Management

A project management application used to organize and delegate tasks.

## About

One of final projects for Viking Code School. The application is built on the MERN stack, React-Redux for the front-end, redux-sagas for making API calls to the server, and Node/MongoDB for the backend.


Demo   :   https://cuddly-octo-umbrella.herokuapp.com/

Source code   :   https://github.com/chrisli4/cuddly-octo-umbrella

Documentation :   https://github.com/chrisli4/cuddly-octo-umbrella/README.md


## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed. You'll also need your own instance of MongoDB.

```
$ git clone git@github.com:chrisli4/cuddly-octo-umbrella.git # or clone your own fork
$ cd cuddly-octo-umbrella.git
$ yarn install

Under the server folder, in the server.js file, connect to your local instance of MongoDB. The seeder files under seeds will also use the same connection.

$ cd /server/seeds
$ node userSeeder.js
$ node boardSeeder.js
$ node listSeeder.js
$ node cardSeeder.js
$ node teamSeeder.js

yarn start

```

Your client app should now be running on [localhost:3000](http://localhost:3000/) and the server should be running on [localhost:3001](http://localhost:3001/)

## Features

### Authentication

The application authenticates API requests using JSON web token generated on login. 

### API Calls

Updates to the DB are made via REST API calls. Each of the following endpoints allow: PUT, DELETE, POST, GET. Do not specify a specific item when creating ex. (/users/:user/boards/). A JSON web token is required in the header for authentication.

```
Boards: 'http://localhost:3001/users/:user/boards/:board'
Lists: 'http://localhost:3001/users/:user/boards/:board/lists/:list'
Cards: 'http://localhost:3001/users/:user/boards/:board/lists/:list/cards/:card'
```

### Boards/Lists/Cards

Users are able to create/update/delete boards using the UI. When updating a board, you'll need to click on "Save Changes" or the changes you've made will be reverted on next login. Double-click on the board title or description to enable EDIT mode and double click again to disable.

### Team Management

Users are able to add other users to a team to share tasks. Users will have to first invite and accept another user's request before they can beging sharing cards. Once a member is added to a team, you'll be able to add that member into any one of your cards. All shared items will be displayed under the "Cards" tab in the Navbar.

### Shared Cards
If another user shares their card with you, you won't be able to delete or add members to that card. You'll only be able to make updates. 



