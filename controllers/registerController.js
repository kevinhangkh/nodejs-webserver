const fsPromises = require('fs').promises;
const path = require('path');
const bcryptjs = require('bcryptjs');

const userDB = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: 'Username and password are required' });
  }

  // Check for duplicates in the db
  const duplicate = userDB.users.find((person) => person.username === user);
  if (duplicate) {
    return res.sendStatus(409); // Conflict
  }

  try {
    // Encrypt password
    const hashedPwd = await bcryptjs.hash(pwd, 10);

    // Store new user
    const newUser = { username: user, password: hashedPwd };
    userDB.setUsers([...userDB.users, newUser]);

    console.log(userDB.users);

    // Write to json file
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(userDB.users)
    );

    res.status(201).json({ message: `New user ${user} created!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = handleNewUser;
