const fsPromises = require('fs').promises;
const bcryptjs = require('bcryptjs');

const userDB = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleLogin = async (req, res) => {
  try {
    const { user, pwd } = req.body;
    if (!user || !pwd) {
      return res
        .status(400)
        .json({ message: 'Username and password are required' });
    }

    const foundUser = userDB.users.find((person) => person.username === user);
    if (!foundUser) {
      return res.sendStatus(401); // Unauthorized
    }

    const match = await bcryptjs.compare(pwd, foundUser.password);
    if (!match) {
      return res.sendStatus(401); // Unauthorized
    }
    res.json({ message: `User ${user} has logged in successfully!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = handleLogin;
