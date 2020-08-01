const { User } = require('../../models');
const { Router } = require('express');
const passport = require('passport');
const { generateToken } = require('../../lib/jwt');

const router = Router();

router.post('/signup', async (req, res) => {
	const { email, password, name } = req.body;

	try {
		await User.create({
			email,
			password,
			name,
		});
		return res.status(201).json({});
	} catch (e) {
		const isSequelizeValidateError =
			e.name === 'SequelizeValidationError' ||
			e.name === 'SequelizeUniqueConstraintError';
		if (isSequelizeValidateError) {
			return res.status(400).json({ msg: e.errors[0].message });
		} else {
			console.error(e);
			return res.status(500).json(e);
		}
	}
});

router.post('/signin', (req, res, next) => {
	// const { email, password } = req.body;
	// 추후 값이 입력되지 않는 상황에 대해 에러 처리 필요
	try {
		passport.authenticate('local', (err, user, info) => {
			const error = err || info;
			if (error) {
				return res.status(400).json({ msg: error.message });
			}

			const accessToken = generateToken({
				id: user.id,
				email: user.email,
				name: user.name,
			});
			return res.json({ accessToken });
		})(req, res, next);
	} catch (e) {
		return res.status(500).json({});
	}
});

module.exports = router;
