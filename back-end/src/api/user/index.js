const { User } = require('../../models');
const router = require('express').Router();
const { isAuthenticated } = require('../../lib/jwt');

router.get('/', async (req, res) => {
	try {
		const users = await User.findAll();
		return res.status(200).json(users);
	} catch (error) {
		res.status(500);
	}
});

router.get('/me', isAuthenticated(), async (req, res) => {
	// console.log(isAuthenticated());
	return res.status(200).json(req.user);
});

router.get('/:id', async (req, res) => {
	const id = parseInt(req.params.id, 10);
	try {
		const user = await User.findByPk(id);
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500);
	}
});

module.exports = router;
