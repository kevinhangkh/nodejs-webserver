const Employee = require('../model/Employee');
const User = require('../model/User');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().exec();
    if (!users) return res.status(204).json({ message: 'No users found' });

    console.log(users);
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req?.body;
  if (!id) return res.status(400).json({ message: 'User id is required' });

  try {
    const user = await User.findOne({ _id: id }).exec();
    if (!user) {
      return res.status(400).json({ message: `User with id: ${id} not found` });
    }

    const result = await user.deleteOne({ _id: id }); //! user with lower case
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  const { id } = req?.params;
  if (!id) return res.status(400).json({ message: 'User id is required' });

  try {
    const user = await User.findOne({ _id: id }).exec();
    if (!user)
      return res.status(400).json({ message: `User with id: ${id} not found` });

    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getUserById,
};
