const jwt = require('jsonwebtoken');
require('dotenv').config();

const userDB = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }

  const refreshToken = cookies.jwt;
  // Find the user that matches the refreshToken
  const foundUser = userDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    return res.sendStatus(401); // Unauthorized
  }

  // Evaluate JWT
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) { // Compare usernames
      return res.sendStatus(403);
    }

    // Get the roles
    const roles = Object.values(foundUser.roles);
    // Create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
    );
    res.json({ accessToken });
  });
};

module.exports = handleRefreshToken;
