const express = require('express');
const router = express.Router();
const data = {};
data.employees = require('../../data/employees.json');

router
  .route('/')
  .get((req, res) => {
    res.json(data.employees);
  })
  .post((req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })
  .put((req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })
  .delete((req, res) => {
    const id = req.body.id;
    const employee = data.employees.find((employee) => employee.id === id);
    if (employee) {
      res.json(employee);
      return;
    }
    res.status(404).send(`Could not delete employee with id: ${id}`);
  });

router.route('/:id').get((req, res) => {
  const id = parseInt(req.params.id);
  const employee = data.employees.find((employee) => employee.id === id);
  if (employee) {
    res.json(employee);
    return;
  }
  res.status(404).send(`Could not find employee with id: ${id}`);
});

module.exports = router;
