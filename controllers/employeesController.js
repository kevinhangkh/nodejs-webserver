const data = {
  employees: require('../model/employees.json'),
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const addEmployee = (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  if (!firstname || !lastname) {
    return res
      .status(400)
      .json({ message: 'First and last names are required' });
  }

  const newEmployee = {
    id: data.employees?.length
      ? data.employees[data.employees.length - 1].id + 1
      : 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  data.employees = [...data.employees, newEmployee];
  res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
  const id = parseInt(req.body.id);
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const employee = data.employees.find((emp) => emp.id === id);

  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee with id: ${id} not found` });
  }

  employee.firstname = firstname ? firstname : employee.firstname;
  employee.lastname = lastname ? lastname : employee.lastname;

  const filteredArray = data.employees.filter((emp) => emp.id !== id);
  const unsortedArray = [...filteredArray, employee];
  const sortedArray = unsortedArray.sort((a, b) =>
    a.id > b.id ? 1 : a.id < b.id ? -1 : 0
  );

  data.employees = [...sortedArray];

  res.status(200).json(data.employees);
};

const deleteEmployee = (req, res) => {
  const id = req.body.id;
  const employee = data.employees.find((employee) => employee.id === id);

  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee with id: ${id} not found` });
  }

  const filteredArray = data.employees.filter((emp) => emp.id !== id);
  data.employees = [...filteredArray];
  res.json(data.employees);
};

const getEmployeeById = (req, res) => {
  const id = parseInt(req.params.id);
  const employee = data.employees.find((employee) => employee.id === id);

  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee with id: ${id} not found` });
  }

  res.json(employee);
};

module.exports = {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
};
