const router = require('express').Router();
const {
  getUsers, getUserById, postNewUser, patchUserInfo, patchUserAvatar,
} = require('../controllers/users.js');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', postNewUser);
router.patch('/me', patchUserInfo);
router.patch('/me/avatar', patchUserAvatar);

module.exports = router;
