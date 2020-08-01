const Router = require('express').Router;
// passport
const passportLib = require('../lib/passport');

const Auth = require('./auth');
const User = require('./user');
const Post = require('./post');

module.exports = () => {
	// passport Library 초기화를 통해 로그인 기능
	passportLib.init();

	const API = Router();

	API.use('/auth', Auth);
	API.use('/users', User);
	API.use('/posts', Post);

	API.get('/', (req, res) => {
		res.json({ msg: 'hello world' });
	});

	return API;
};
