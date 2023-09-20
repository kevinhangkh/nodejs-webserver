const express = require('express');
const {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
} = require('../../controllers/employeesController');
const router = express.Router();

router
  .route('/')
  .get(getAllEmployees)
  .post(addEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

router.route('/:id').get(getEmployeeById);

module.exports = router;
