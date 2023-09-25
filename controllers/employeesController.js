const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().exec();
    if (!employees)
      return res.status(204).json({ message: 'No employees found' });

    console.log(employees);
    res.json(employees);
  } catch (error) {
    console.log(error);
  }
};

const addEmployee = async (req, res) => {
  const { firstname, lastname } = req?.body;
  if (!firstname || !lastname) {
    return res
      .status(400)
      .json({ message: 'First and last names are required' });
  }

  try {
    const result = await Employee.create({
      firstname,
      lastname,
    });

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req?.body;
  if (!id) return res.status(400).json({ message: 'Employee id is required' });

  const { firstname, lastname } = req?.body;
  if (!firstname || !lastname)
    return res
      .status(400)
      .json({ message: 'First name and/or last names are required' });

  try {
    const foundEmployee = await Employee.findOne({ _id: id }).exec();
    if (!foundEmployee) {
      return res.status(204).json({ message: `No employee matches id: ${id}` });
    }

    foundEmployee.firstname = firstname ? firstname : foundEmployee.firstname;
    foundEmployee.lastname = lastname ? lastname : foundEmployee.lastname;

    const result = await foundEmployee.save();

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req?.body;
  if (!id) return res.status(400).json({ message: 'Employee id is required' });

  try {
    const employee = await Employee.findOne({ _id: id }).exec();
    if (!employee) {
      return res
        .status(400)
        .json({ message: `Employee with id: ${id} not found` });
    }

    const result = await employee.deleteOne({ _id: id }); //! employee with lower case
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const getEmployeeById = async (req, res) => {
  const { id } = req?.params;
  if (!id) return res.status(400).json({ message: 'Employee id is required' });

  try { 
    const employee = await Employee.findOne({ _id: id }).exec();
    if (!employee) {
      return res
        .status(400)
        .json({ message: `Employee with id: ${id} not found` });
    }

    res.json(employee);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
};
