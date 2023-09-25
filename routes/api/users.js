const express = require('express');
const verifyRoles = require('../../middleware/verifyRoles');
const ROLE_LIST = require('../../config/rolesList');
const {
  getAllUsers,
  deleteUser,
  getUserById,
} = require('../../controllers/usersController');
const router = express.Router();

router
  .route('/')
  .get(verifyRoles(ROLE_LIST.Admin), getAllUsers)
  .delete(verifyRoles(ROLE_LIST.Admin), deleteUser);

router.route('/:id').get(verifyRoles(ROLE_LIST.Admin), getUserById);

module.exports = router;
