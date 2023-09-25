const express = require('express');
const {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
} = require('../../controllers/employeesController');
const verifyRoles = require('../../middleware/verifyRoles');
const ROLE_LIST = require('../../config/rolesList');
const router = express.Router();

router
  .route('/')
  .get(getAllEmployees)
  .post(verifyRoles(ROLE_LIST.Admin, ROLE_LIST.Editor), addEmployee)
  .put(verifyRoles(ROLE_LIST.Admin, ROLE_LIST.Editor), updateEmployee)
  .delete(verifyRoles(ROLE_LIST.Admin), deleteEmployee);

router.route('/:id').get(getEmployeeById);

module.exports = router;
