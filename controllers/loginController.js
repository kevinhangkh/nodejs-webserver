const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

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
    // Create JWTs
    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    // Save refreshToken with found user
    const otherUsers = userDB.users.filter(
      (person) => person.username !== foundUser.username
    );
    const currentUser = { ...foundUser, refreshToken };
    userDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(userDB.users)
    );

    //! Store refreshToken in HTTP only cookie which is safer than in cookie or localStorage
    /*
      An HttpOnly Cookie is a tag added to a browser cookie that prevents client-side scripts from accessing data. 
      It provides a gate that prevents the specialized cookie from being accessed by anything other than the server.
    */
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = handleLogin;
